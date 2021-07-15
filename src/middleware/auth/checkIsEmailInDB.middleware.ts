import {NextFunction, Response} from 'express';

import {CodesEnum} from '../../constants';
import {IRequest} from '../../interface';
import {customErrors, ErrorHandler} from '../../error';
import {userService} from '../../service/user';

export const checkIsEmailInDBMiddleware =
  async (req: IRequest, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    try {
      const {email} = req.body;

      const userWithEmail = await userService.findOneByParams({email});

      if (!userWithEmail){
        return next(new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
      }

      req.user = userWithEmail;

      next();
    } catch (e) {
      next(e);
    }

  };
