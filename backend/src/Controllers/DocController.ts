import { RequestHandler } from "express";
import mongoose from "mongoose";
import * as DocService from "../Services/DocService";
import { responseStatus } from "../interfaces/response";

// create a new doc
export const createDoc: RequestHandler = async (req, res) => {
  let result: responseStatus = {};
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return;
    }
    if (mongoose.Types.ObjectId.isValid(_id)) {
      const objectId = new mongoose.Types.ObjectId(_id);
      const newDoc = await DocService.createDoc(objectId);
      result.status = "success";
      result.data = newDoc;

      return res.status(200).send(result);
    } else {
      result.status = "failed";
      result.msg = "Invalid ID format";
      return res.status(400).send(result);
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

// add access to other user
export const addAccess: RequestHandler = async (req, res) => {
  let result: responseStatus = {};
  try {
    const data = req.body;
    const addResult = await DocService.addAccessUser(data._id, data.email);

    if (addResult === "success") {
      result.status = "success";
      result.msg = "Share to other success.";
      return res.status(200).send(result);
    }
    result.status = "failed";
    result.msg = "User not found or User already been shared this doc.";
    return res.status(404).send(result);
  } catch (error) {
    console.log(error);
    result = {
      status: "failed",
      msg: "There're some errors in server",
    };
    return res.status(500).send(result);
  }
};

// get my doc
export const getMyDoc: RequestHandler = async (req, res) => {
  let result: responseStatus = {};
  try {
    const { userId } = req.params;
    const myDoc = await DocService.getMyDoc(userId);
    console.log(myDoc);
    result = {
      status: "success",
      data: myDoc,
    };
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    result = {
      status: "failed",
      msg: "There're some errors in server",
    };
    return res.status(500).send(result);
  }
};

// get shared doc
export const getMyShared: RequestHandler = async (req, res) => {
  let result: responseStatus = {};
  try {
    const { userId } = req.params;
    const sharedDoc = await DocService.getMyShared(userId);
    if (sharedDoc) {
      result = {
        status: "success",
        data: sharedDoc,
      };
      return res.status(200).send(result);
    }
    result = {
      status: "success",
      msg: "There're some error.",
    };
    return res.status(404).send(result);
  } catch (error) {
    console.log(error);
    result = {
      status: "failed",
      msg: "There're some errors in server",
    };
    return res.status(500).send(result);
  }
};

export const deleteDocById: RequestHandler = async (req, res) => {
  let result: responseStatus = {};
  try {
    const { docId } = req.body;
    const deleteDocResult = await DocService.deleteDocById(docId);
    if (deleteDocResult === 1) {
      result = {
        status: "success",
        msg: "Successfully delete doc.",
      };
      return res.status(200).send(result);
    }

    result = {
      status: "failed",
      msg: "Document not found",
    };
    return res.status(404).send(result);
  } catch (error) {
    console.log(error);
    result = {
      status: "failed",
      msg: "There're some errors in server.",
    };
    return res.status(500).send(result);
  }
};
