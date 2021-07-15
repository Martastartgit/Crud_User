import { UsersActionEnum } from '../constants';

export const htmlTemplates: {[index: string]: {subject: string, templateFileName: string}} = {
  [UsersActionEnum.USER_REGISTER]: {
    subject: 'Підтвердження',
    templateFileName: 'userConfirmEmail'
  },

  [UsersActionEnum.CHANGE_PASSWORD]: {
    subject: 'Зміна паролю',
    templateFileName: 'changePassword'
  }
};
