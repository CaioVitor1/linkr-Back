import { Router } from "express";
import { createLike, deleteLike } from "../controllers/likesController.js";
import { validateToken } from "../middlewares/validators/tokenValidator.js";

const likesRouter = Router();
likesRouter.post("/likes", validateToken, createLike);
likesRouter.delete("/likes", validateToken, deleteLike);

export default likesRouter;
