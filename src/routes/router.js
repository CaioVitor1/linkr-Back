
import { Router } from "express";
import postRouter from "./postRouter.js"
import authRouter from "./authRouter.js";
import trendingRouter from "./trendingRouter.js";
import hash from "./trendingRouter.js";

const router = Router();

router.use(authRouter);
router.use(trendingRouter);
router.use(postRouter)


export default router;










