import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";
import { validateSchema } from "../middlewares/validations/schemaValidator.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUp);
authRouter.post("/signin", validateSchema(signInSchema), signIn);

export default authRouter;
