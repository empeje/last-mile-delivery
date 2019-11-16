/* eslint security/detect-unsafe-regex:0 */
// TODO: Research about unsafe regex I use
import Joi from "@hapi/joi";

export const createOrderBodyValidation = Joi.object({
  origin: Joi.array()
    .max(2)
    .min(2)
    .items(Joi.string().required(), Joi.number().required())
    .required(),
  destination: Joi.array()
    .max(2)
    .min(2)
    .items(Joi.string().required(), Joi.number().required())
    .required()
});
