import { Router } from "express";
import homeRouter from "./home";

const router: Router = Router();

router.use(`/home`, homeRouter) 


export default router;
