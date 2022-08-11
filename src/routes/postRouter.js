import { Router } from "express";
import newPostSchema from "../schemas/newPostSchema.js";
import { validateSchema } from "../middlewares/validators/schemaValidator.js";
import { createPost, getPosts } from "../controllers/postController.js";
import { validateToken } from "../middlewares/validators/tokenValidator.js";
const router = Router();

router.post(
  "/newpost",
  validateToken,
  validateSchema(newPostSchema),
  createPost
);
router.post("/getposts", validateToken, getPosts);
export default router;
