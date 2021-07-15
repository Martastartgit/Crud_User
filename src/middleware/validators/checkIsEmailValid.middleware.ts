import {NextFunction, Request, Response} from 'express';
import {emailValidator} from '../../validator';
import {ErrorHandler} from '../../error';
import {CodesEnum} from '../../constants';

export const checkIsEmailValidMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const {error} = emailValidator.validate(req.body);

    if (error) {
      throw new ErrorHandler(CodesEnum.BAD_REQUEST, error.details[0].message);

    }

    next();
  } catch (e) {
    next(e);
  }

};
