import {Router} from 'express';

import {StatusEnum, UsersActionEnum} from '../../constants';
import {userController} from '../../controller';
import {
  // checkAccessTokenMiddleware,
  checkIsEmailInDBMiddleware,
  checkIsEmailValidMiddleware,
  checkIsPasswordValidMiddleware,
  checkPhotoUpload,
  checkStatusMiddleware,
  checkUserAccessTokenMiddleware,
  isBodyValidMiddleware,
  isEmailExistMiddleware,
  isUserIdValidMiddleware, updateUserBodyValidMiddleware
} from '../../middleware';

const router = Router();

router.post('/',
  isEmailExistMiddleware,
  isBodyValidMiddleware,
  checkPhotoUpload,
  userController.createUser);

router.post('/confirm',
  checkUserAccessTokenMiddleware(UsersActionEnum.USER_REGISTER),
  checkStatusMiddleware(StatusEnum.USER_PENDING),
  userController.confirmUser);

router.post('/password/forgot',
  checkIsEmailValidMiddleware,
  checkIsEmailInDBMiddleware,
  userController.changePassword);

router.post('/password/reset',
  checkUserAccessTokenMiddleware(UsersActionEnum.CHANGE_PASSWORD),
  checkIsPasswordValidMiddleware,
  userController.setNewPassword);

router.route('/:userId')
  .all(isUserIdValidMiddleware
  )
  .get(userController.findById)
  .post(checkPhotoUpload,
    updateUserBodyValidMiddleware,
    isEmailExistMiddleware,
    userController.updateUser)
  .delete(userController.deleteUser);

export const userRouter = router;

// checkAccessTokenMiddleware
