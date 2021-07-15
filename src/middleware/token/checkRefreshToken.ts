import {NextFunction, Response} from 'express';

import {CodesEnum, RequestHeadersEnum} from '../../constants';
import {IRequest} from '../../interface';
import {customErrors, ErrorHandler} from '../../error';
import {tokenRefreshVerificator} from '../../helper';
import {authService} from '../../service';

export const checkRefreshTokenMiddleware =
  async (req: IRequest, res: Response, next: NextFunction): Promise<void | NextFunction>=> {
    try {
      const refresh_token = await req.get(RequestHeadersEnum.AUTHORIZATION);

      if (!refresh_token) {
        return next(new ErrorHandler(CodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_TOKEN.message));
      }

      await tokenRefreshVerificator(refresh_token);

      const tokens = await authService.findTokenByParams({refreshToken: refresh_token});

      if (!tokens) {
        return next(new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
      }

      req.token = tokens;

      next();
    } catch (e) {
      next(e);
    }

  };
