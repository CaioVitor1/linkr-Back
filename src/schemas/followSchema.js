import joi from 'joi';

const newFollowSchema = joi.object({
  profileId: joi.number().required(),
  follower: joi.number().required()
});

export default newFollowSchema;