
import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken';
import newPostSchema from '../schemas/newPostSchema';

const router = Router();

router.post('/newpost',validateToken, schemaValidator(newPostSchema), createPost);

export default router;