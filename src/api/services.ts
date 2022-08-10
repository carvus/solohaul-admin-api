import { Router } from "express";
import Crud from "../lib/crud";
import multer from "../middlewares/multer/multer";
import validate from "../middlewares/validator";

const router: Router = Router();

const crud = new Crud("services");
crud.columns = ["id", "title", "description", "mobileBackground", "background", "cardImage", "ticketImage"];

router.get("", crud.get);

router.post("", multer.fields([
    { name: "mobileBackground", maxCount: 1 },
    { name: "background", maxCount: 1 },
    { name: "cardImage", maxCount: 1 },
    { name: "ticketImage", maxCount: 1 }
]), validate("add_service"), crud.add);

router.put("/:id", multer.fields([
    { name: "mobileBackground", maxCount: 1 },
    { name: "background", maxCount: 1 },
    { name: "cardImage", maxCount: 1 },
    { name: "ticketImage", maxCount: 1 }
]), validate("update_service"), crud.update);



export default router;