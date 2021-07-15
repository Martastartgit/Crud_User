import {NextFunction, Response} from 'express';

import {CodesEnum, RequestHeadersEnum, UsersActionEnum} from '../../constants';
import {comparePassword, tokenizer} from '../../helper';
import {IRequest, IToken, UserInterface} from '../../interface';
import {authService} from '../../service';

class AuthController {
  async userAuthorization(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {_id, password} = req.user as UserInterface;

      const user = req.body;

      await comparePassword(user.password, password);

      const {access_token, refresh_token} = tokenizer(UsersActionEnum.USER_LOGIN);

      await authService.createToken({accessToken: access_token, refreshToken: refresh_token, userId: _id});

      res.json({access_token, refresh_token});

    } catch (e) {
      next(e);
    }

  }

  async createNewPair(req: IRequest, res: Response, next: NextFunction) {
    try {
      const {_id, userId} = req.token as IToken;

      const {access_token, refresh_token} = tokenizer(UsersActionEnum.USER_LOGIN);

      await authService.createNewTokens(_id, {accessToken: access_token, refreshToken: refresh_token, userId});

      res.json({access_token, refresh_token});

    } catch (e) {
      next(e);
    }
  }

  async logout(req: IRequest, res: Response, next: NextFunction) {
    try {
      const accessToken = await req.get(RequestHeadersEnum.AUTHORIZATION);

      await authService.removeToken({accessToken});

      res.sendStatus(CodesEnum.NO_CONTENT);
    } catch (e) {
      next(e);
    }

  }

}
export const authController = new AuthController();
