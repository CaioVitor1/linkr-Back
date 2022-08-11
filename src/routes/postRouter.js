
import { Router } from 'express';
import { validateToken } from '../middlewares/tokenValidator.js';
import newPostSchema from '../schemas/newPostSchema.js';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { createPost, getPosts } from '../controllers/postController.js';
const router = Router();

//preciso colocar o validateToken nas rotas: newpost

router.post('/newpost', validateToken, validateSchema(newPostSchema), createPost);
router.post('/getposts', validateToken, getPosts)
export default router;