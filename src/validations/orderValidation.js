/* eslint security/detect-unsafe-regex:0 */
// TODO: Research about unsafe regex I use
import Joi from "@hapi/joi";

const numericString = Joi.string()
  .regex(/^-?\d*\.?\d+$/)
  .required();

export const createOrderBodyValidation = Joi.object({
  origin: Joi.array()
    .max(2)
    .min(2)
    .items(numericString, numericString)
    .required(),
  destination: Joi.array()
    .max(2)
    .min(2)
    .items(numericString, numericString)
    .required()
});
