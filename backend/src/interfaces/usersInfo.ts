import { ObjectId } from "mongoose";

export interface usersInfo {
  userList: Array<userListUser | undefined>;
  onlineList: Array<onlineListUser | undefined>;
}

export interface onlineListUser {
  _id: ObjectId;
  name: string | undefined;
  photoSticker: string | undefined;
}

export interface userListUser {
  _id: ObjectId;
  email: string;
}
