import {NextFunction, Response} from 'express';

import {CodesEnum, RequestHeadersEnum, UsersActionEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../error';
import {tokenVerificator} from '../../helper';
import {IRequest} from '../../interface';
import {userService} from '../../service/user';

export const checkUserAccessTokenMiddleware = (action: UsersActionEnum) =>
  async (req: IRequest, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    try {
      const token = await req.get(RequestHeadersEnum.AUTHORIZATION);

      if (!token){
        return next(new ErrorHandler(CodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_TOKEN.message));
      }

      switch (action) {
        case UsersActionEnum.USER_REGISTER : {
          await tokenVerificator(UsersActionEnum.USER_REGISTER, token);

          const userByToken = await userService.findOneByParams(
            {'tokens.action': UsersActionEnum.USER_REGISTER, 'tokens.token': token}
          );

          if (!userByToken) {
            throw new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message);
          }

          req.user = userByToken;
          break;
        }

        case UsersActionEnum.CHANGE_PASSWORD: {
          await tokenVerificator(UsersActionEnum.CHANGE_PASSWORD, token);

          const userByToken = await userService.findOneByParams(
            {'tokens.action': UsersActionEnum.CHANGE_PASSWORD, 'tokens.token': token}
          );

          if (!userByToken) {
            throw new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message);
          }

          req.user = userByToken;
          break;
        }

        default:
          throw new ErrorHandler(CodesEnum.BAD_REQUEST, customErrors.WRONG_ACTION.message);

      }

      next();
    } catch (e) {
      next(e);
    }

  };
