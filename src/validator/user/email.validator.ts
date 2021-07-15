import * as joi from 'joi';

import { RegexpEnum } from '../../constants';

export const emailValidator = joi.object({
  email: joi.string().trim().regex(RegexpEnum.email).required()
});
