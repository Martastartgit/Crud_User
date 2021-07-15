import {verify, VerifyErrors} from 'jsonwebtoken';

import {CodesEnum} from '../constants';
import {config} from '../config';
import {customErrors, ErrorHandler} from '../error';

export const tokenRefreshVerificator = (token: string): Promise<VerifyErrors | null> => {
  try {
    const isTokenValid = verify(token, config.JWT_REFRESH_SECRET) as Promise<VerifyErrors | null> ;

    return isTokenValid;

  } catch (e) {
    throw new ErrorHandler(
      CodesEnum.UNAUTHORIZED,
      customErrors.UNAUTHORIZED_BAD_TOKEN.message,
      customErrors.UNAUTHORIZED_BAD_TOKEN.code);

  }

};
