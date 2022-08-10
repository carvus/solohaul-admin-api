import { Request } from "express";
import { createController } from "../lib";
import DbOperations from "../providers/db/operations";
const { common, app } = DbOperations;

export const addServiceController = createController(async (req: Request) => {
    const data = {
        ...req.body,
        order: (await app.getServicesLastOrder())[0].order
    };

    return await common.insert("services", data);
});