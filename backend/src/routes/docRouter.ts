import { Router } from "express";
import * as DocController from "../Controllers/DocController";

export const docRouter = Router();

// ======= Create ======
docRouter.post("/createDoc/:_id", DocController.createDoc);
docRouter.post("/addAccess", DocController.addAccess);

// ======= Receive ======
docRouter.get("/myDoc/:userId", DocController.getMyDoc);
docRouter.get("/myShared/:userId", DocController.getMyShared);

//======= Update ======
docRouter.patch("/updateCover", DocController.updateDocCover);

//======= Delete ======
