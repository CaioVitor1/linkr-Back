import { Router } from "express";
import { createFollow, deleteFollow, searchFollow } from "../controllers/followController.js";
import { validateSchema } from "../middlewares/validators/schemaValidator.js";
import { validateToken } from "../middlewares/validators/tokenValidator.js";
import newFollowSchema from "../schemas/followSchema.js";


const followRouter = Router();
followRouter.post('/follow', validateToken, validateSchema(newFollowSchema), createFollow);
followRouter.get('/follow/:profileId', validateToken, searchFollow);
followRouter.delete('/follow/:profileId', validateToken, deleteFollow);
export default followRouter;
