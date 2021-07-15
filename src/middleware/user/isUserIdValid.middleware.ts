import * as mongoose from 'mongoose';
import {NextFunction, Response} from 'express';

import {IRequest, UserInterface} from '../../interface';
import {customErrors, ErrorHandler} from '../../error';
import {CodesEnum} from '../../constants';
import {userService} from '../../service/user';

export const isUserIdValidMiddleware =
    async (req: IRequest, res: Response, next: NextFunction): Promise<void | NextFunction> => {
      try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
          throw new ErrorHandler(CodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NOT_VALID_ID.message);
        }

        const userById = await userService.findUserById(userId) as UserInterface;

        if (!userById) {
          throw new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message);
        }

        req.user = userById;

        next();
      } catch (e) {
        next(e);
      }

    };
