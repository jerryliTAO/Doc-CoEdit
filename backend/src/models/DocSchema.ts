import { Schema, model } from "mongoose"
const docSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        default: "Untitled",
        maxLength: 64
    },
    content: {
        type: Object
    },
    photoSticker: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/149/149071.png"
    },
    cover: {
        type: String,
    },
    lastModified: {
        type: Date,
    }
})
export const DocSchema = model('Document', docSchema)