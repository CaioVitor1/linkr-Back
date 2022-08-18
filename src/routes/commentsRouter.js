import { Router } from "express"
import { addComment, loadComments } from "../controllers/commentsController.js";
import { validateToken } from "../middlewares/validators/tokenValidator.js";

const commentsRouter = Router();

commentsRouter.post("/addComment", validateToken, addComment);
commentsRouter.get("/listComments/:postId", validateToken, loadComments);

export default commentsRouter;