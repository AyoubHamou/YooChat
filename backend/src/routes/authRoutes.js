import express from "express";
import { login, logout, onboard, signup } from "../controllers/authControllers.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/onboarding",protectRoute, onboard)

// Basic route to get the auth user

router.get("/me", protectRoute, (req,res) => {
    res.json({success:true, user:req.user})
})


export default router;
