import joi from 'joi';

const newPostSchema = joi.object({
  url: joi.string().required(),
  comment: joi.string()
});

export default newPostSchema;