import { Document, model, Model, Schema } from 'mongoose';

import { GenderEnum, RolesEnum, StatusEnum, TableNameEnum } from '../../constants';
import { UserInterface } from '../../interface';
import { softDeletePlugin } from './softDeletePlugin.schema';

export type UserType = UserInterface & Document;

const tokenSubModel = {
  action: String,
  token: String
};

export const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    minlength: 4,
    maxlength: 25,
    required: true
  },
  surname: {
    type: String,
    minlength: 4,
    maxlength: 50,
    required: true
  },
  gender: {
    type: String,
    enum :[GenderEnum.FEMALE, GenderEnum.MALE],
    required: false
  },
  password: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    default: RolesEnum.USER
  },
  status: {
    type: String,
    required: true,
    default: StatusEnum.USER_PENDING
  },
  tokens: [tokenSubModel],
  photos: [{ type: String }]
},
{ timestamps:true }
);

UserSchema.statics.softDeleteUser = function(id) {
  return this.findByIdAndUpdate(id, {isDeleted: true, deletedAt: new Date()});
};

UserSchema.plugin(softDeletePlugin);

export const UserModel: Model<UserType> = model<UserType>(TableNameEnum.USER, UserSchema);
