import categoryModel from "../models/category.model.js"

//create category controller
export const createCategoryController = async (req, res) => {
    try {
        const {category} = req.body
        if(!category) {
            return res.status(404).json({
                message: "category not found",
                success: false
            })
        }
        await categoryModel.create({category})
        return res.status(201).json({
            message: "category created successfully",
            success: true,
            category
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
            success: false
        })
    }
}