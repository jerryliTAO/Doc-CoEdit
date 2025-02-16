import mongoose, { Types } from "mongoose";
import { DocSchema } from "../models/DocSchema";
import { UserSchema } from "../models/UserSchema";

export const createDoc = async (_id: mongoose.Types.ObjectId) => {
  try {
    const newDoc = await DocSchema.create({ owner: _id });
    return newDoc;
  } catch (error) {
    throw error;
  }
};

export const addAccessUser = async (docId: string, email: string) => {
  try {
    const user = await UserSchema.findOne({ email: email });
    const objectId = new Types.ObjectId(docId);
    const doc = await DocSchema.findOne({ _id: objectId }, "_id owner");
    if (user?._id.toString() === doc?.owner.toString()) {
      return "failed_Can't share to yourself.";
    }

    // make sure user exist and the shared doc not duplicate, then update
    if (user && user.shared.indexOf(objectId) === -1) {
      user.shared.push(objectId);
      await UserSchema.findOneAndUpdate({ email: email }, { shared: user.shared }, { runValidators: true });
      return "success";
    }
    return "failed";
  } catch (error) {
    throw error;
  }
};

// get my doc
export const getMyDoc = async (userId: string) => {
  try {
    const myDoc = await DocSchema.find({ owner: userId }).populate({
      path: "owner",
      select: "name",
    });
    return myDoc;
  } catch (error) {
    throw error;
  }
};

// get shared doc
export const getMyShared = async (userId: string) => {
  try {
    const sharedDoc = await UserSchema.findById(userId, "shared").populate({
      path: "shared",
      populate: { path: "owner", select: "name" },
    });
    return sharedDoc?.shared;
  } catch (error) {
    throw error;
  }
};

export const deleteDocById = async (docId: string) => {
  try {
    // check if doc exist
    const doc = await DocSchema.findOneAndDelete({ _id: docId });
    if (doc !== null) {
      return 1;
    }
    return 0;
  } catch (error) {
    throw error;
  }
};

export const updateDocCover = async (id: string, cover: string) => {
  try {
    const result = await DocSchema.findOneAndUpdate({ _id: id }, { cover: cover }, { new: true });
    if (result !== null) {
      return 1;
    }
    return 0;
  } catch (error) {
    throw error;
  }
};
