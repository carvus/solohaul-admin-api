import { createController } from '../../lib';
import DbOperations from '../../providers/db/operations';
const { app } = DbOperations;
import { TController } from './../../lib/types';

export const getBlogController: TController = createController(async () => {
    const blog = await app.home_blog();
    return { items: blog };
});
