import { DocSchema } from "../models/DocSchema";
import { UserSchema } from "../models/UserSchema";

// get all user information
export const getUserALLInfo = async (userId: string) => {
  try {
    let findUser = await UserSchema.findById(userId, "-email -password")
      .populate({
        path: "shared",
        populate: { path: "owner", select: "name" },
      })
      .populate({
        path: "recentOpened._id",
        populate: { path: "owner", select: "name" },
      });
    let findDoc = await DocSchema.find({ owner: userId }).populate({ path: "owner", select: "name" });

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

export const getUserProfile = async (userId: string) => {
  const userProfile = await UserSchema.findById(userId, "name photoSticker cover -_id");
  return userProfile;
};

export const updateUserProfile = async (userId: string, updateData: userProfileUpdateData) => {
  const result = await UserSchema.findOneAndUpdate({ _id: userId }, updateData);
  return result;
};
