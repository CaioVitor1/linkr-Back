import { Router } from "express";

import newPostSchema from "../schemas/newPostSchema.js";

import {
  createPost,
  deletepost,
  getPosts,
  getAllPosts,
  updatePosts,
  getposts2,
} from "../controllers/postController.js";
import { validateToken } from "../middlewares/validators/tokenValidator.js";
import { validateSchema } from "../middlewares/validators/schemaValidator.js";

const router = Router();

router.post(
  "/newpost",
  validateToken,
  validateSchema(newPostSchema),
  createPost
);
router.get("/getposts", validateToken, getPosts);
router.delete("/deletepost/:postId", validateToken, deletepost);
router.put("/updateposts", validateToken, updatePosts);
router.get("/getallposts", getAllPosts);
router.get("/getposts2/:offset", validateToken, getposts2);

export default router;
