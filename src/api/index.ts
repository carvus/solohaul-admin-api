import { Router } from 'express';
import { TRoute } from './../lib/types';
import { setupRouter } from '../lib';


import newsRouter from './news';
import authRouter from './auth';

const router: Router = Router();


const apiRoutes: TRoute[] = [
    { path: `/auth`, router: authRouter },
    { path: `/news`, router: newsRouter }
];

setupRouter(apiRoutes, router);

export default router;
