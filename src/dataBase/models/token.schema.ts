import {Document, model, Model, Schema} from 'mongoose';

import {IToken} from '../../interface';
import {TableNameEnum} from '../../constants';

export type TokenType = IToken & Document

export const TokenSchema = new Schema<IToken>({
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId, ref: TableNameEnum.USER, required: true
  }
},{
  timestamps: true
}
);

export const TokenModel: Model<TokenType> = model<TokenType>(TableNameEnum.TOKEN, TokenSchema);
