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
        maxLength: 128
    },
    recentOpened: {
        type: [{
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'Document'
            },
            lastOpened: Date
        }],
        default: []
    }
})

export const UserSchema = model('User', userSchema);