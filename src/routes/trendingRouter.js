import { Router } from "express";
import { hashtagPosts, trendingRanking } from "../controllers/trendingController.js";
import { validateToken } from "../middlewares/validators/tokenValidator.js";

const router = Router();

router.get('/trendingRanking', trendingRanking);
router.get('/hashtag/:hashtag', hashtagPosts);

export default router;