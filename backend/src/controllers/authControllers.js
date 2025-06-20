import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config";
import { upsertStreamUser } from "../lib/stream.js";

export async function signup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    // Some Validations
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "All fields are required" });
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password))
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.",
      });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email))
      return res
        .status(400)
        .json({ message: "Please enter a valid email address." });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Email already exist, please use a different one" });
    const idx = Math.floor(Math.random() * 1000) + 1;
    const randomAvatar = `https://robohash.org/${idx}.png?set=set4`;
    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomAvatar,
    });

    // create the user also in getstream
    await upsertStreamUser({
      id: newUser._id.toString(),
      name: newUser.fullName,
      image: newUser.profilePic || "",
    });
    // JWT_SECRET_KEY is generated with : openssl rand -base64 32
    const token = jwt.sign(
      { userId: newUser._id, userFullname: fullName },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 3600 * 1000,
      httpOnly: true, // for xss attacks
      sameSite: "strict", // for csrf attacks
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Error in the signup", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid email or password" });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 3600 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in the login", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
export function logout(req, res) {
  res.clearCookie("jwt");
  res
    .status(200)
    .json({ success: true, message: "You have successfully logged out." });
}

export async function onboard(req, res) {
  try {
    const userId = req.user._id;
    const { fullName, nativeLanguage, learningLanguage, bio, location } =
      req.body;
    if (
      !fullName ||
      !nativeLanguage ||
      !learningLanguage ||
      !bio ||
      !location
    ) {
      return res
        .status(400)
        .json({
          message: "all fields are required",
          missingFields: [
            !fullName && "fullName",
            !nativeLanguage && "nativeLanguage",
            !learningLanguage && "learningLanguage",
            !bio && "bio",
            !location && "location",
          ].filter(Boolean),
        });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, {
      ...req.body,
      isOnboarded: true,
    },{new: true});
    if (!updatedUser)
      return res.status(400).json({message: "User not found"});
    res.status(200).json({success:true, user:updatedUser});
    try {
      upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      })
    } catch (Streamerror) {
      console.error("Error while updating the stream user", Streamerror.message)
    }
  } catch (error) {
    console.error("Error in the Onboarding", error)
    res.status(500).json({message: "Internal server error"});
  }
}
