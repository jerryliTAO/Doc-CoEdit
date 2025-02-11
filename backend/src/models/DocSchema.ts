import moment from "moment";
import { Schema, model } from "mongoose";
import { UserSchema } from "./UserSchema";
const docSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    default: "Untitled",
    maxLength: 64,
  },
  content: {
    type: Object,
  },
  cover: {
    type: String,
    default: "https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  lastModified: {
    type: Date,
    default: moment(),
  },
});

// delete data in User.shared before doc been deleted
docSchema.pre("findOneAndDelete", async function (next) {
  try {
    const deleteId = this.getFilter()._id;

    // delete use's shared doc which contains deleteId
    await UserSchema.updateMany({ shared: deleteId }, { $pull: { shared: deleteId } });

    //delete use's recentOpened doc which contains deleteId
    await UserSchema.updateMany({ recentOpened: deleteId }, { $pull: { recentOpened: deleteId } });

    next();
  } catch (error) {
    throw error;
  }
});

export const DocSchema = model("Document", docSchema);
