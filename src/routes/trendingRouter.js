import { Router } from "express";
import { trendingRanking } from "../controllers/trendingController";

const router = Router();

router.get('/trendingRanking', trendingRanking);

export default router;