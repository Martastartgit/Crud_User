import {Router} from 'express';

import {authRouter} from './auth';
import {logoutRouter} from './logout';
import {refreshRouter} from './refresh';
import {userRouter} from './user';

const router = Router();

router.use('/auth', authRouter );
router.use('/logout', logoutRouter);
router.use('/refresh', refreshRouter);
router.use('/users', userRouter);

export const apiRouter = router;
