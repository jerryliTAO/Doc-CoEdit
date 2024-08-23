import { Router } from "express";
import * as UserController from "../Controllers/UserController";

export const userRouter = Router();

userRouter.get("/:userId", UserController.getUserInformation);
userRouter.get("/profile/:userId", UserController.getUserProfile);

userRouter.patch("/profile/:userId", UserController.updateUserProfile);
