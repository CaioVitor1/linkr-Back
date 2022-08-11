import { Router } from "express";
import authRouter from "./authRouter.js";
import trendingRouter from "./trendingRouter.js";
import hash from "./trendingRouter.js";

const router = Router();

router.use(authRouter);
router.use(trendingRouter);

export default router;
