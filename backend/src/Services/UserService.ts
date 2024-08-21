import mongoose from "mongoose";
import { DocSchema } from "../models/DocSchema";
import { UserSchema } from "../models/UserSchema";

// get all user information
export const getUserALLInfo = async (userId: string) => {
  try {
    let findUser = await UserSchema.findById(
      userId,
      "-email -password"
    ).populate({
      path: "shared",
      populate: { path: "owner", select: "name" },
    });

    //get user docs
    let findDoc: object = {};
    if (mongoose.Types.ObjectId.isValid(userId)) {
      findDoc = await DocSchema.find(
        {
          owner: new mongoose.Types.ObjectId(userId),
        },
        "-owner"
      );
    }

    //set user information
    if (findUser) {
      let user = {
        _id: findUser._id,
        name: findUser.name,
        photoSticker: findUser.photoSticker,
        cover: findUser.cover,
        shared: findUser.shared,
        myDoc: findDoc,
        recentOpened: findUser.recentOpened,
      };

      return user;
    }
  } catch (error) {
    throw error;
  }
};
