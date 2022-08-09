import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import { signUpSchema } from "../schemas/authSchema.js";
import { validateSchema } from "../middlewares/validations/schemaValidator.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUp);

export default authRouter;
