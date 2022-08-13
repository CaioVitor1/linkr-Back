

import { Router } from 'express';

import newPostSchema from '../schemas/newPostSchema.js';

import { createPost, deletepost, getPosts } from '../controllers/postController.js';
import { validateToken } from '../middlewares/validators/tokenValidator.js';
import { validateSchema } from '../middlewares/validators/schemaValidator.js';

const router = Router();



router.post('/newpost', validateToken, validateSchema(newPostSchema) , createPost);
router.get('/getposts', validateToken, getPosts)
router.delete('/deletepost/:postId', validateToken, deletepost)

export default router;


