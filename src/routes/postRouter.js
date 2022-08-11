
import { Router } from 'express';

import newPostSchema from '../schemas/newPostSchema.js';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { createPost, getPosts } from '../controllers/postController.js';
import { validateToken } from '../middlewares/tokenValidator.js';
const router = Router();



router.post('/newpost', validateToken, validateSchema(newPostSchema), createPost);
router.post('/getposts', validateToken, getPosts)
export default router;