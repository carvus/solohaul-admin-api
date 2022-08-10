import { Router } from "express";
import { addServiceController } from "../controllers/services";
import Crud from "../lib/crud";
import multer from "../middlewares/multer/multer";
import validate from "../middlewares/validator";

const router: Router = Router();

const crud = new Crud("services");
crud.columns = ["id", "title", "description", "price", "mobileBackground", "background", "cardImage", "ticketImage"];

router.get("", crud.get);

router.post("", multer.fields([
    { name: "mobileBackground", maxCount: 1 },
    { name: "background", maxCount: 1 },
    { name: "cardImage", maxCount: 1 },
    { name: "ticketImage", maxCount: 1 }
]), validate("add_service"), addServiceController);

router.put("/:id", multer.fields([
    { name: "mobileBackground", maxCount: 1 },
    { name: "background", maxCount: 1 },
    { name: "cardImage", maxCount: 1 },
    { name: "ticketImage", maxCount: 1 }
]), validate("update_service"), crud.update);

router.delete("/:id", crud.remove);

export default router;