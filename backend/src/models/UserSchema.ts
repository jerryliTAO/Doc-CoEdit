import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 128,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxLength: 128,
  },
  recentOpened: {
    type: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Document",
        },
        lastOpened: Date,
      },
    ],
    default: [],
  },
  shared: {
    type: [{ type: Schema.Types.ObjectId, ref: "Document", unique: true }],
    default: [],
  },
  photoSticker: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
  },
  cover: {
    type: String,
    default:
      "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
});

export const UserSchema = model("User", userSchema);
