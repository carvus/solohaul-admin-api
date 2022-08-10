import { Router } from 'express';
import { TRoute } from './../lib/types';
import { setupRouter } from '../lib';


import newsRouter from './news';
import authRouter from './auth';
import authMiddleware from '../middlewares/authMiddleware';

const router: Router = Router();


const apiRoutes: TRoute[] = [
    { path: `/auth`, router: authRouter },
    { path: `/news`, router: newsRouter, middlewares: [authMiddleware] }
];

setupRouter(apiRoutes, router);

export default router;
