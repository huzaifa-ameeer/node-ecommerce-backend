import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requied: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already taken"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [6, "password should be greater than 6 characters"]
    },
    address: {
        type: String,
        required: [true, "address is required"]
    },
    city: {
        type: String,
        required: [true, "city is required"]
    },
    country: {
        type: String,
        required: [true, "country is required"]
    },
    phone: {
        type: String,
        required: [true, "phone number is required"]
    },
    profilePic: {
        type: String
    }
}, {timestamps: true})

const userModel = mongoose.model("User", userSchema)

export default userModel