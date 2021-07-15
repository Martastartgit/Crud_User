import {Router} from 'express';

import {checkAccessTokenMiddleware} from '../../middleware';
import {authController} from '../../controller';

const router = Router();

router.post('/user',
  checkAccessTokenMiddleware,
  authController.logout
);

export const logoutRouter = router;
