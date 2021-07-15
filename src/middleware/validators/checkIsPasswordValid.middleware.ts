import {NextFunction, Response} from 'express';

import {CodesEnum} from '../../constants';
import {ErrorHandler} from '../../error';
import {IRequest} from '../../interface';
import {passwordValidator} from '../../validator';

export const checkIsPasswordValidMiddleware = (req: IRequest, res: Response, next: NextFunction): void => {
  try {
    const {error} = passwordValidator.validate(req.body);

    if (error) {
      throw new ErrorHandler(CodesEnum.BAD_REQUEST, error.details[0].message);
    }

    next();
  } catch (e) {
    next(e);
  }

};
