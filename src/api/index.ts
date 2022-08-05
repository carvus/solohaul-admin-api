import { Router } from 'express';
import { TRoute } from './../lib/types';
import { setupRouter } from '../lib';

import authRouter from './auth';

const router: Router = Router();


const apiRoutes: TRoute[] = [
    { path: `/auth`, router: authRouter },
];

setupRouter(apiRoutes, router);

export default router;
