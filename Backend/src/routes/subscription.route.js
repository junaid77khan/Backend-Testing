import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middlware.js';
import {
    getSubscribedChannels,
    getUserChannelSubscribers, 
    toggleSubscription
} from '../controllers/subscription.controller.js'

const router = Router()

router.use(verifyJWT)

router.route("/c/:channelId").post(toggleSubscription)
router.route("/c/:userId").get(getSubscribedChannels)
router.route("/u/:userId").get(getUserChannelSubscribers)

export default router