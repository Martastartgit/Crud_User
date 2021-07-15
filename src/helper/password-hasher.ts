import * as bcrypt from 'bcrypt';

import {config} from '../config';
import {customErrors, ErrorHandler} from '../error';
import {CodesEnum} from '../constants';

export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, config.SaltRounds);

export const comparePassword = async (password: string, hashPassword: string): Promise<any> => {
  const isPasswordEquals = await bcrypt.compare(password, hashPassword);

  if (!isPasswordEquals) {
    throw new ErrorHandler(CodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message);
  }
};

