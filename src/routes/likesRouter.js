import { Router } from "express";
import { createLike, deleteLike } from "../controllers/likesController.js";
import { validateToken } from "../middlewares/validators/tokenValidator.js";

const likesRouter = Router();
likesRouter.post("/addlikes", validateToken, createLike);
likesRouter.post("/deletelikes", validateToken, deleteLike);

export default likesRouter;
