import * as joi from 'joi';

import {RegexpEnum} from '../../constants';

export const authValidator = joi.object({
  email: joi.string().trim().regex(RegexpEnum.email).required(),
  password: joi.string().trim().regex(RegexpEnum.password).required()
});
