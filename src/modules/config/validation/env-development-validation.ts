import * as Joi from 'joi';

export default Joi.object({
  port: Joi.number().required(),
  redis_host: Joi.string().required(),
  redis_password: Joi.string().required(),
  redis_port: Joi.number().required(),
});
