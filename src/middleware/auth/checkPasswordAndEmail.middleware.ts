import {NextFunction, Request, Response} from 'express';
import {authValidator} from '../../validator';
import {ErrorHandler} from '../../error';
import {CodesEnum} from '../../constants';

export const checkPasswordAndEmailMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const {error} = authValidator.validate(req.body);

    if (error) {
      return next(new ErrorHandler(CodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
  } catch (e) {
    next(e);
  }

};
