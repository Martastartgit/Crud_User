import { IUserToken, UserInterface } from '../../interface';
import { UserModel } from '../../database/models';

class UserService {
  createUser(user: Partial<UserInterface>): Promise<UserInterface> {
    return UserModel.create(user);
  }

  addActionToken(id: string, tokenObject: IUserToken): Promise<UserInterface> {
    return UserModel.findByIdAndUpdate(id, {$push: {tokens: tokenObject}}) as any;
  }

  findOneByParams(findObject: any): Promise<UserInterface | null>{
    return UserModel.findOne(findObject) as any;
  }

  findUserById(id: string): Promise<UserInterface | null> {
    return UserModel.findById(id).select('-password').exec();
  }

  updateByParams(id: string, params: Partial<UserInterface>): Promise<UserInterface> {
    return UserModel.findByIdAndUpdate(id, params, {new: true}) as any;
  }

  softDeleteUser(id: string): Promise<UserInterface> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return UserModel.softDeleteUser(id) as any;
  }

}

export const userService = new UserService();
