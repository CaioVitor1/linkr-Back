import { Router } from "express";
import { searchUserByName, userPagePosts } from "../controllers/userPageController.js";
import { validateToken } from "../middlewares/validators/tokenValidator.js";

const router = Router();
router.get('/user/:id', userPagePosts);
router.get('/users/', searchUserByName);

export default router;