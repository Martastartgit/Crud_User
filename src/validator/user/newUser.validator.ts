import * as joi from 'joi';

import {GenderEnum, RegexpEnum} from '../../constants';

export const newUserValidator = joi.object({
  name: joi.string().trim().min(4).max(25).required(),
  surname: joi.string().trim().min(2).max(50).required(),
  gender: joi.string().trim().allow(GenderEnum.MALE, GenderEnum.FEMALE),
  password: joi.string().trim().regex(RegexpEnum.password).required(),
  email: joi.string().trim().regex(RegexpEnum.email).required()
});
