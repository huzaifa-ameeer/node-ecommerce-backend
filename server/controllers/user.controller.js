import userModel from "../models/user.model.js"

//register controller
export const registerController = async(req, res) => {
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password) {
            return res.status(400).json({
                message: "missing details",
                success: false
            }) 
        }
        const existingUser = await userModel.findOne({email})
        if(existingUser) {
            return res.status(409).json({
                message: "email already taken",
                success: false
            })
        }
        const user = await userModel.create({
            name, email, password
        })
        return res.status(201).json({
            message: "user registered successfully",
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }
}