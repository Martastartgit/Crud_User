import { NextFunction, Request, Response } from 'express';

import {CodesEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../error';
import {userService} from '../../service/user';

export const isEmailExistMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
  try {
    const { email } = req.body;
    const userWithEmail = await userService.findOneByParams({email});

    if (userWithEmail) {
      throw new ErrorHandler(
        CodesEnum.BAD_REQUEST,
        customErrors.BAD_REQUEST_EMAIL_EXIST.message,
        customErrors.BAD_REQUEST_EMAIL_EXIST.code);
    }

    next();
  } catch (e) {
    next(e);
  }

};
