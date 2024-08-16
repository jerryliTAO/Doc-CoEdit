import mongoose from "mongoose";
import { DocSchema } from "../models/DocSchema";
import { UserSchema } from "../models/UserSchema";

export const createDoc = async (_id: mongoose.Types.ObjectId) => {
  try {
    const newUser = await UserSchema.where("email").equals("123@gmail.com");
    const newDoc = await DocSchema.create({ owner: newUser[0]._id });
    return newDoc;
  } catch (error) {
    console.log(error);
  }
};
