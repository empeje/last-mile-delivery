/* eslint security/detect-unsafe-regex:0 */
// TODO: Research about unsafe regex I use
import Joi from "@hapi/joi";
import { ENUM_ORDER_STATUS_TAKEN } from "../constants";

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

export const takeOrderParamsValidation = Joi.object({
  id: Joi.string()
    .uuid()
    .required()
});

export const takeOrderBodyValidation = Joi.object({
  status: Joi.string()
    .valid(ENUM_ORDER_STATUS_TAKEN)
    .required()
});
