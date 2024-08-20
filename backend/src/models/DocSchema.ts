import { Schema, model } from "mongoose";
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
    default:
      "https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  lastModified: {
    type: Date,
  },
});
export const DocSchema = model("Document", docSchema);
