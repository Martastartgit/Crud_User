import {verify, VerifyErrors} from 'jsonwebtoken';

import {CodesEnum, UsersActionEnum} from '../constants';
import {config} from '../config';
import {customErrors, ErrorHandler} from '../error';

export const tokenVerificator = (action: UsersActionEnum, token: string): Promise<VerifyErrors | null> => {
  try {
    let isTokenValid;

    switch (action) {
      case UsersActionEnum.USER_REGISTER:
        isTokenValid = verify(token, config.JWT_CONFIRM_EMAIL_SECRET) as Promise<VerifyErrors | null> ;
        break;

      case UsersActionEnum.USER_LOGIN:
        isTokenValid = verify(token, config.JWT_ACCESS_SECRET) as Promise<VerifyErrors | null>;
        break;

      case UsersActionEnum.CHANGE_PASSWORD:
        isTokenValid = verify(token, config.JWT_PASS_RESET_SECRET) as Promise<VerifyErrors | null>;
        break;

      default:
        throw new ErrorHandler(CodesEnum.SERVER, customErrors.WRONG_ACTION.message, customErrors.WRONG_ACTION.code);

    }

    return isTokenValid;

  } catch (e) {
    throw new ErrorHandler(
      CodesEnum.UNAUTHORIZED,
      customErrors.UNAUTHORIZED_BAD_TOKEN.message,
      customErrors.UNAUTHORIZED_BAD_TOKEN.code);

  }
};
