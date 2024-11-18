import Joi from 'joi';
import { typeList } from '../constants/typeList.js';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  age: Joi.number().integer().min(6).max(16).required(),
  gender: Joi.string()
    .valid(...typeList)
    .required(),
  avgMark: Joi.number().min(2).max(12),
  onDuty: Joi.boolean(),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  age: Joi.number().integer().min(6).max(16),
  gender: Joi.string().valid(...typeList),
  avgMark: Joi.number().min(2).max(12),
  onDuty: Joi.boolean(),
});
