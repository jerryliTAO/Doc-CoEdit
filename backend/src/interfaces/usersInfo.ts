import { ObjectId } from "mongoose";

export interface usersInfo {
  userList: Array<object | string | undefined>;
  onlineList: Array<onlineListUser | undefined>;
}

export interface onlineListUser {
  _id: ObjectId;
  name: string | undefined;
  photoSticker: string | undefined;
}
