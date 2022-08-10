import joi from 'joi';

const newPostSchema = joi.object({
  url: joi.url().required()
});

export default newPostSchema;