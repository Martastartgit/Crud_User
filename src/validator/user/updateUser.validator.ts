import * as joi from 'joi';

import {GenderEnum, RegexpEnum} from '../../constants';

export const updateUserValidator = joi.object({
  name: joi.string().trim().min(4).max(25),
  surname: joi.string().trim().min(2).max(50),
  gender: joi.string().trim().allow(GenderEnum.MALE, GenderEnum.FEMALE),
  email: joi.string().trim().regex(RegexpEnum.email)
});
