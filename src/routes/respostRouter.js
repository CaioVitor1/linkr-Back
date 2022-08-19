import { Router } from "express";
import { creatRepost } from "../controllers/repostController.js";
import { validateToken } from "../middlewares/validators/tokenValidator.js";



const repostRouter = Router();
repostRouter.post('/repost', validateToken, creatRepost);

export default repostRouter;
