import { Router } from 'express';
import { getServiceTicketsController } from '../controllers/services';
import Crud from '../lib/crud';
import validate from '../middlewares/validator';

const router: Router = Router();

const crud = new Crud("service_tickets");

router.get("/:serviceId", getServiceTicketsController);
router.post("", validate("add_ticket"), crud.add);
router.put("/:id", validate("update_ticket"), crud.update);
router.delete("/:id", crud.remove);


export default router;