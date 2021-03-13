import * as Joi from 'joi';

export default Joi.object({
  /* PORT APP */
  PORT: Joi.required()
});
