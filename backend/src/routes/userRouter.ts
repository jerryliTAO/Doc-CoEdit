import { Router } from "express";
import * as UserController from "../Controllers/UserController";

export const userRouter = Router();

userRouter.get("/:_id", UserController.getUserInformation);
