import {CodesEnum, StatusEnum} from '../../constants';
import {IRequest, UserInterface} from '../../interface';
import {NextFunction, Response} from 'express';
import {customErrors, ErrorHandler} from '../../error';

export const checkStatusMiddleware = (status: StatusEnum ) =>
  (req: IRequest, res: Response, next: NextFunction): void | NextFunction => {
    try {
      const user = req.user as UserInterface;

      switch (status) {
        case StatusEnum.USER_PENDING:

          if (user.status !== StatusEnum.USER_PENDING) {
            return next(new ErrorHandler(
              CodesEnum.BAD_REQUEST,
              customErrors.BAD_REQUEST_ALREADY_ACTIVATED.message,
              customErrors.BAD_REQUEST_ALREADY_ACTIVATED.code));

          }
          break;

        case StatusEnum.USER_CONFIRMED:

          if (user.status !== StatusEnum.USER_CONFIRMED) {
            return next(new ErrorHandler(
              CodesEnum.FORBIDDEN,
              customErrors.FORBIDDEN_NOT_CONFIRMED.message,
              customErrors.FORBIDDEN_NOT_CONFIRMED.code));

          }
          break;

        default:
          return next(new ErrorHandler(CodesEnum.BAD_REQUEST,
            customErrors.WRONG_ACTION.message));

      }
      next();
    } catch (e) {
      next(e);
    }

  };

