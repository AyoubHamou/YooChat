import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js";
import { acceptFriendRequest, getFriendRequests, getMyfriends, getOutgoingFriendReqs, getRecommandedUsers, rejectFriendRequest, sendFriendRequest, updateAvatar } from "../controllers/userControllers.js";
const router = express.Router();

router.use(protectRoute)

router.get("/", getRecommandedUsers)
router.get("/friends", getMyfriends)
router.post("/friend-request/:id", sendFriendRequest)
router.put("/friend-request/:id/accept", acceptFriendRequest)
router.delete("/friend-request/:id", rejectFriendRequest)
router.get("/friend-requests", getFriendRequests)
router.get("/outgoing-friend-requests", getOutgoingFriendReqs)
router.patch("/update-avatar", updateAvatar);


export default router;