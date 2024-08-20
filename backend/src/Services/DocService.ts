import mongoose from "mongoose";
import { DocSchema } from "../models/DocSchema";
import { UserSchema } from "../models/UserSchema";

export const createDoc = async (_id: mongoose.Types.ObjectId) => {
  try {
    const newDoc = await DocSchema.create({ owner: _id });
    return newDoc;
  } catch (error) {
    console.log(error);
  }
};

export const addAccessUser = async (_id: string, email: string) => {
  try {
    const user = await UserSchema.findOne({ email: email });
    if (user) {
      user.shared.push(new mongoose.Types.ObjectId(_id));
      await UserSchema.findOneAndUpdate(
        { email: email },
        { shared: user.shared },
        { runValidators: true }
      );
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
    return sharedDoc;
  } catch (error) {
    throw error;
  }
};
