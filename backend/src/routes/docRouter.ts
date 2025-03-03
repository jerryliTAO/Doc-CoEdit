import { Router } from "express";
import * as DocController from "../Controllers/DocController";

export const docRouter = Router();

// ======= Create ======
docRouter.post("/createDoc/:_id", DocController.createDoc);
docRouter.post("/addAccess", DocController.addAccess);

// ======= Receive ======
docRouter.get("/myDoc/:userId", DocController.getMyDoc);
docRouter.get("/myShared/:userId", DocController.getMyShared);
docRouter.get("/:userId/:docId", DocController.getAccess);

//======= Update ======
docRouter.patch("/updateCover", DocController.updateDocCover);

//======= Delete ======
docRouter.delete("/deleteDoc/:docId", DocController.deleteDocById);
