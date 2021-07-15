import {NextFunction, Response} from 'express';

import {CodesEnum, Constants, RequestHeadersEnum, StatusEnum, UsersActionEnum} from '../../constants';
import {IRequest, UserInterface} from '../../interface';
import {fileUpload, hashPassword, tokenizer} from '../../helper';
import {authService, emailService, userService} from '../../service';

class UserController {
  async createUser(req: IRequest, res: Response, next: NextFunction){
    try {
      const user = req.body as UserInterface;
      const photos = req.photos || [];

      user.password = await hashPassword(user.password);

      const { _id } = await userService.createUser(user);

      if (photos) {
        await fileUpload(Constants.CREATE, _id, photos, userService);
      }

      const { access_token } = tokenizer(UsersActionEnum.USER_REGISTER);

      await userService.addActionToken(_id, {action: UsersActionEnum.USER_REGISTER, token: access_token});

      await emailService.sendMail(user.email, UsersActionEnum.USER_REGISTER, {token: access_token});

      res.sendStatus(CodesEnum.CREATED);

    } catch (e) {
      next(e);
    }

  }

  async confirmUser(req: IRequest, res: Response, next: NextFunction){
    try {
      const { _id, tokens = [] } = req.user as UserInterface;

      const tokenToDelete = await req.get(RequestHeadersEnum.AUTHORIZATION);

      const newToken = tokens.filter((item: any)=> item.token !== tokenToDelete);

      await userService.updateByParams(_id, {status: StatusEnum.USER_CONFIRMED, tokens: newToken}as Partial<UserInterface>);

      res.end();
    } catch (e) {
      next(e);
    }

  }

  async changePassword(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { _id, email } = req.user as UserInterface;

      const { access_token } = tokenizer(UsersActionEnum.CHANGE_PASSWORD);

      await userService.addActionToken(_id, {action: UsersActionEnum.CHANGE_PASSWORD, token: access_token});

      await emailService.sendMail(email, UsersActionEnum.CHANGE_PASSWORD, {token: access_token});

      res.end();
    } catch (e) {
      next(e);
    }
  }

  async setNewPassword(req: IRequest, res: Response, next: NextFunction){
    try {
      const { _id, tokens = [] } = req.user as UserInterface;

      const { password } = req.body;

      const tokenToDelete = await req.get(RequestHeadersEnum.AUTHORIZATION);

      const newToken = tokens.filter((item)=> item.token !== tokenToDelete);

      const newPassword = await hashPassword(password);

      await userService.updateByParams(_id, {password: newPassword, tokens: newToken} as Partial<UserInterface>);

      res.end();
    } catch (e) {
      next(e);
    }
  }

  async updateUser(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const photos = req.photos || [];

      await userService.updateByParams(userId, req.body);

      if (photos) {
        await userService.updateByParams(userId, { $set: {photos: [] }} as any );

        await fileUpload(Constants.UPDATE, userId, photos, userService);
      }

      res.end();
    } catch (e) {
      next(e);
    }
  }

  async findById(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await userService.findUserById(userId);

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const tokenToDelete = await req.get(RequestHeadersEnum.AUTHORIZATION);

      await userService.softDeleteUser(userId);

      await authService.removeToken({accessToken: tokenToDelete});

      res.end();
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
