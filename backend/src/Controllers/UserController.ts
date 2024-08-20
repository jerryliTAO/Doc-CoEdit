import { RequestHandler } from "express";
import * as UserService from "../Services/UserService";
import { responseStatus } from "../interfaces/response";

export const getUserInformation: RequestHandler = async (req, res) => {
  let result: responseStatus = {};
  try {
    const { _id } = req.params;
    const user = await UserService.getUserALLInfo(_id);
    if (user) {
      result = {
        status: "success",
        data: user,
      };
      return res.status(200).send(user);
    }

    result = {
      status: "failed",
      msg: "There're some error.",
    };
    return res.status(400).send(result);
  } catch (error) {
    console.log(error);
    result = {
      status: "failed",
      msg: "There're some errors in server",
    };
    return res.status(500).send(result);
  }
};
