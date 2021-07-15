import {NextFunction, Request, Response} from 'express';

import {CodesEnum} from '../../constants';
import {ErrorHandler} from '../../error';
import {updateUserValidator} from '../../validator/user';

export const updateUserBodyValidMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const {error} = updateUserValidator.validate(req.body);

    if (error) {
      throw new ErrorHandler(CodesEnum.BAD_REQUEST, error.details[0].message);
    }

    next();
  } catch (e) {
    next(e);
  }
};
