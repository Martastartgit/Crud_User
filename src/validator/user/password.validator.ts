import * as joi from 'joi';

import { RegexpEnum } from '../../constants';

export const passwordValidator = joi.object({
  password: joi.string().trim().regex(RegexpEnum.password).required()
});
