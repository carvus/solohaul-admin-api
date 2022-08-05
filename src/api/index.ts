import { Router } from 'express';
import { TRoute } from './../lib/types';
import { setupRouter } from '../lib';
 
import appRouter from './app'; 
import authRouter from './auth';

const router: Router = Router();


const apiRoutes: TRoute[] = [
    { path: `/auth`, router: authRouter },
    { path: `/app`, router: appRouter },
    // { path: `/admin`, router: adminRouter, middlewares: [authMiddleware('admin')] },
] 

setupRouter(apiRoutes, router);

export default router;
