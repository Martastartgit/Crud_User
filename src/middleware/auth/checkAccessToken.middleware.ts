import {CodesEnum, RequestHeadersEnum, UsersActionEnum} from '../../constants';
import {IRequest} from '../../interface';
import {NextFunction, Response} from 'express';
import {customErrors, ErrorHandler} from '../../error';
import {tokenVerificator} from '../../helper';
import {authService} from '../../service';

export const checkAccessTokenMiddleware =
  async (req: IRequest, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    try {
      const token = await req.get(RequestHeadersEnum.AUTHORIZATION);

      if (!token){
        return next(new ErrorHandler(CodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_TOKEN.message));
      }

      await tokenVerificator(UsersActionEnum.USER_LOGIN, token);

      const userByToken = await authService.findUserByToken({accessToken: token});

      if (!userByToken) {
        throw new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message);
      }

      req.user = userByToken;

      next();
    } catch (e) {
      next(e);
    }

  };
