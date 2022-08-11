import joi from 'joi';

const newPostSchema = joi.object({
  url: joi.string().required(),
  description: joi.string()
});

export default newPostSchema;