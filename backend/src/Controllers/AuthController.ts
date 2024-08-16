import { RequestHandler } from "express";
import * as AuthService from "../Services/AuthService";
import { singUpValidation } from "../config/joi";
import { responseStatus } from "../interfaces/response";

export const singUp: RequestHandler = async (req, res) => {
  let result: responseStatus = {};
  try {
    const params = req.body;

    // validate sing up data
    const { error } = singUpValidation(params);
    if (error) {
      result = {
        status: "failed",
        msg: "Email or password or name are irregularity",
      };
      return res.status(404).send(result);
    }

    const user = await AuthService.singUp(
      params.email,
      params.password,
      params.name
    );

    if (user == "failed") {
      result = { status: "failed", msg: "This email already been used." };
      return res.status(400).send(result);
    } else {
      result = { status: "success", data: user };
      return res.status(200).send(user);
    }
  } catch (error) {
    result = { status: "failed", msg: "There's some error in server" };
    return res.status(500).send(result);
  }
};
