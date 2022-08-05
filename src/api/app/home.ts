import { getBlogController } from '../../controllers/pages/home';
import { Router } from "express";   

const router: Router = Router();
 
router.get('/blog', getBlogController); 
 
export default router;
