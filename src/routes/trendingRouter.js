import { Router } from "express";
import { trendingRanking } from "../controllers/trendingController.js";

const router = Router();

router.get('/trendingRanking', trendingRanking);

export default router;