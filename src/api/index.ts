import { Router } from 'express';
import { TRoute } from './../lib/types';
import { setupRouter } from '../lib';
import authMiddleware from '../middlewares/authMiddleware';

import newsRouter from './news';
import authRouter from './auth';
import servicesRouter from './services';

const router: Router = Router();


const apiRoutes: TRoute[] = [
    { path: `/auth`, router: authRouter },
    { path: `/news`, router: newsRouter, middlewares: [authMiddleware] },
    { path: `/services`, router: servicesRouter, middlewares: [authMiddleware] }
];

setupRouter(apiRoutes, router);

export default router;
