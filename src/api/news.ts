import { Router } from "express";
import Crud from "../lib/crud";
import multer from "../middlewares/multer/multer";
import validate from "../middlewares/validator";

const router: Router = Router();

const crud = new Crud("news");

router.get("", crud.get);

router.post("", multer.fields([
    { name: "image", maxCount: 1 },
    { name: "blog_image", maxCount: 1 },
    { name: "mobile_image", maxCount: 1 }
]), validate("add_news"), crud.add);

router.put("/:id", multer.fields([
    { name: "image", maxCount: 1 },
    { name: "blog_image", maxCount: 1 },
    { name: "mobile_image", maxCount: 1 }
]), validate("update_news"), crud.update);

router.delete("/:id", crud.remove);

export default router;