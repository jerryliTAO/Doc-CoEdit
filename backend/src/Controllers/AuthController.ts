import { RequestHandler } from "express";
import * as AuthService from "../Services/AuthService";
import { singInValidation, singUpValidation } from "../config/joi";
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

    const user = await AuthService.singUp(params.email, params.password, params.name);

    if (user == "failed") {
      result = { status: "failed", msg: "This email already been used." };
      return res.status(400).send(result);
    } else {
      result = { status: "success", data: user };
      return res.status(200).send(result);
    }
  } catch (error) {
    console.log(error);
    result = {
      status: "failed",
      msg: "There're some errors in server",
    };
    return res.status(500).send(result);
  }
};

export const singIn: RequestHandler = async (req, res) => {
  let result: responseStatus = {};
  try {
    const params = req.body;
    // validate sing in data
    const { error } = singInValidation(params);
    if (error) {
      result = {
        status: "failed",
        msg: "Email or password are irregularity",
      };
      return res.status(400).send(result);
    }

    const user = await AuthService.singIn(params.email, params.password);
    if (user == "failed") {
      result = {
        status: "failed",
        msg: "This email not exist or password wrong.",
      };
      return res.status(400).send(result);
    } else {
      result = {
        status: "success",
        data: user,
      };
      return res.status(200).send(result);
    }
  } catch (error) {
    console.log(error);
    result = {
      status: "failed",
      msg: "There're some errors in server",
    };
    return res.status(500).send(result);
  }
};
