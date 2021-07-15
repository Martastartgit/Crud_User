import {Router} from 'express';

import {
  checkIsEmailInDBMiddleware,
  checkPasswordAndEmailMiddleware,
  checkStatusMiddleware
} from '../../middleware';
import {StatusEnum} from '../../constants';
import {authController} from '../../controller';

const router = Router();

router.post('/user',
  checkPasswordAndEmailMiddleware,
  checkIsEmailInDBMiddleware,
  checkStatusMiddleware(StatusEnum.USER_CONFIRMED),
  authController.userAuthorization
);

export const authRouter = router;
