import { Request } from 'express';

import { UserInterface } from './user.interface';
import { IToken } from './token.interface';

export interface IRequest extends Request{
    user?: UserInterface,
    token?: IToken,
    photos?: any,
}
