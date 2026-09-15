import mongoose from "mongoose";
import bcrypt from "bcryptjs"

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

//function to save password as hashed value
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

//function to compare password during login
userSchema.methods.comparePassword = async function (password){
    return await  bcrypt.compare(password, this.password)
}

const userModel = mongoose.model("User", userSchema)

export default userModel