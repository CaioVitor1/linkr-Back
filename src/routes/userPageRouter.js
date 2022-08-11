import { Router } from "express";
import { userPagePosts } from "../controllers/userPageController.js";
import { validateToken } from "../middlewares/validators/tokenValidator.js";

const router = Router();
router.get('/user/:id', validateToken, userPagePosts);

export default router;