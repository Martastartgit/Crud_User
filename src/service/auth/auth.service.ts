import {IToken, UserInterface} from '../../interface';
import {TokenModel} from '../../database';

class AuthService {
  createToken(tokenObject: Partial<IToken>): Promise<IToken> {
    return TokenModel.create(tokenObject);
  }

  createNewTokens(id: string, tokens: Partial<IToken>): Promise<IToken> {
    return TokenModel.findByIdAndUpdate(id, tokens) as any;
  }

  findTokenByParams(findObject: { accessToken?: string, refreshToken?: string }): Promise<IToken | null> {
    return TokenModel.findOne(findObject).exec();
  }

  async findUserByToken(findObject: { accessToken?: string, refreshToken?: string }): Promise<UserInterface | null> {
    const tokenWithUser = await TokenModel
      .findOne(findObject)
      .populate('userId')
      .select({userId: 1, _id: 0}) as any;

    return tokenWithUser?.userId?.toJSON();
  }

  removeToken(removeObject: { accessToken?: string, refreshToken?: string }): Promise<IToken | null> {
    return TokenModel.findOneAndDelete(removeObject).exec();
  }

}
export const authService = new AuthService();
