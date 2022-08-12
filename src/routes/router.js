
import { Router } from "express";
import postRouter from "./postRouter.js"
import authRouter from "./authRouter.js";
import trendingRouter from "./trendingRouter.js";
import userPageRouter from "./userPageRouter.js";

const router = Router();

router.use(authRouter);
router.use(trendingRouter);
router.use(userPageRouter);
router.use(postRouter)


export default router;










