import { Router } from "express";
import * as AuthController from "../Controllers/AuthController";

export const authRouter = Router();

// authRouter.post("/singin", async (req, res) => {
//   const params = req.body;
//   console.log(params);
//   const user = await AuthService.singIn(params.email, params.password);
//   console.log(user);
//   res.send(user);
// });

authRouter.post("/singup", AuthController.singUp);
