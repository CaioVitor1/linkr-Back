import { Router } from "express";
import postRouter from "./postRouter.js";
import authRouter from "./authRouter.js";
import trendingRouter from "./trendingRouter.js";
import userPageRouter from "./userPageRouter.js";
import likesRouter from "./likesRouter.js";
import commentsRouter from "./commentsRouter.js";

const router = Router();

router.use(authRouter);
router.use(trendingRouter);
router.use(userPageRouter);
router.use(postRouter);
router.use(likesRouter);
router.use(commentsRouter);

export default router;
