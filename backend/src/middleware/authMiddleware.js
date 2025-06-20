import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "unauthorized - token not found" });
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode)
      return res
        .status(401)
        .json({ message: "unauthorized - token not valid" });
    const user = await User.findById(decode.userId).select("-password");
    if (!user)
      return res.status(401).json({ message: "unauthorized - user not found" });
    req.user = user;
    next()
  } catch (error) {
    console.error("Error in protectRoute", error);
    res.status(500).json({message: "internal server error"})
  }
};
