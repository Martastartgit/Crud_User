import {NextFunction, Request, Response} from 'express';

import {CodesEnum} from '../../constants';
import {ErrorHandler} from '../../error';
import {newUserValidator} from '../../validator/user';

export const isBodyValidMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const {error} = newUserValidator.validate(req.body);

    if (error) {
      throw new ErrorHandler(CodesEnum.BAD_REQUEST, error.details[0].message);
    }

    next();
  } catch (e) {
    next(e);
  }
};
