import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requied: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [6, "password should be greater than 6 characters"]
    },
    profilePic: {
        type: String
    }
}, {timestamps: true})

const userModel = mongoose.model("User", userSchema)

export default userModel