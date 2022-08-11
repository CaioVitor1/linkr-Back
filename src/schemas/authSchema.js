import joi from "joi";

export const signUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  name: joi.string().required(),
  image: joi
    .string()
    .regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)
    .required(),
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
