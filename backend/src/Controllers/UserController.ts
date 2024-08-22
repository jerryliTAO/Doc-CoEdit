import { RequestHandler } from "express";
import * as UserService from "../Services/UserService";
import { responseStatus } from "../interfaces/response";

export const getUserInformation: RequestHandler = async (req, res) => {
  let result: responseStatus = {};
  try {
    const { userId } = req.params;
    const user = await UserService.getUserALLInfo(userId);
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
      msg: "There're some errors in server.",
    };
    return res.status(500).send(result);
  }
};

export const getUserProfile: RequestHandler = async (req, res) => {
  let result: responseStatus = {};
  const { userId } = req.params;
  try {
    const userProfile = await UserService.getUserProfile(userId);
    if (userProfile) {
      result = {
        status: "success",
        data: userProfile,
      };
      return res.status(200).send(result);
    }
    result = {
      status: "failed",
      msg: "Can't find the user.",
    };
    return res.status(400).send(result);
  } catch (error) {
    console.log(error);
    result = {
      status: "failed",
      msg: "There're some errors in server.",
    };
    return res.status(500).send(result);
  }
};

export const updateUserProfile: RequestHandler = async (req, res) => {
  let result: responseStatus = {};
  try {
    const { userId } = req.params;
    const updateData = req.body;
    const updateResult = await UserService.updateUserProfile(userId, updateData);
    if (updateResult) {
      result = {
        status: "success",
        msg: "Successfully update.",
      };
      return res.status(200).send(result);
    }
    result = {
      status: "failed",
      msg: "Failed to update",
    };
    return res.status(400).send(result);
  } catch (error) {
    console.log(error);
    result = {
      status: "failed",
      msg: "There're some errors in server.",
    };
    return res.status(500).send(result);
  }
};
