import {Router} from 'express';

import {checkRefreshTokenMiddleware} from '../../middleware';
import {authController} from '../../controller';

const router = Router();

router.post('/user', checkRefreshTokenMiddleware, authController.createNewPair);

export const refreshRouter = router;
