import * as Joi from 'joi';

export default Joi.object({
  port: Joi.number().required(),
});
