import { Router } from "express";
import * as AuthController from "../Controllers/AuthController";

export const authRouter = Router();

authRouter.post("/singin", AuthController.singIn);
authRouter.post("/singup", AuthController.singUp);
