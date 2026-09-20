import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import { v2 as cloudinary } from "cloudinary";
import { getDataUri } from "../utils/feature.js";

//get all product controllet
export const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel.find({}).populate("category");;
    return res.status(200).json({
      message: "products fetched successfully",
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

//get single product controller
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "product not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "product found successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      return res.status(500).json({
        message: "invalid id",
        success: false,
      });
    }
  }
};

//create product controller
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    if(!name || !description || !price || !stock || !category) {
        return res.status(400).json({
            message: "please provide all the field content",
            success: false
        })
    }
    const categoryExists = await categoryModel.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        message: "category not found",
        success: false,
      });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "please provide product image",
        success: false,
      });
    }
    const file = getDataUri(req.file);

    const cdb = await cloudinary.uploader.upload(file.content);
    const image = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    const product = await productModel.create({
      name,
      description,
      price,
      stock,
      category,
      images: [image],
    });

    return res.status(201).json({
      message: "product created successfully",
      success: true,
      product,
    });
  } catch (error) {
  console.log(error);

  if (error.name === "CastError") {
    return res.status(400).json({
      message: "invalid category id",
      success: false,
    });
  }

  return res.status(500).json({
    message: "internal server error",
    success: false,
  });
}
}

//update product controller
export const updateProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "product not found",
        success: false,
      });
    }

    const { name, description, price, stock, category } = req.body;
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    await product.save();

    return res.status(200).json({
      message: "product updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      return res.status(500).json({
        message: "invalid id",
        success: false,
      });
    }
  }
};

//update product image controller
export const updateProductImageController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "product not found",
        success: false,
      });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "please provide product image",
        success: false,
      });
    }
    const file = getDataUri(req.file);
    const cdb = await cloudinary.uploader.upload(file.content);
    const image = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    product.images.push(image);
    await product.save();
    return res.status(200).json({
      message: "product image updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

//delete product controller
export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "product not found",
        success: false,
      });
    }
   for (const image of product.images) {
  if (image.public_id) {
    const result = await cloudinary.uploader.destroy(image.public_id);
    
  }
}
    await productModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Product and image deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server erorr",
      success: false,
    });
  }
};

//delete product image controller
export const deleteProductImageController = async (req, res) => {
  try {
    const { id, public_id } = req.params;
    // const { public_id } = req.body;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "product not found",
        success: false,
      });
    }

    const image = product.images.find(
      (image) => image.public_id === public_id
    );

    if (!image) {
      return res.status(404).json({
        message: "image not found",
        success: false,
      });
    }

    await cloudinary.uploader.destroy(image.public_id);

    product.images = product.images.filter(
      (image) => image.public_id !== public_id
    );

    await product.save();

    return res.status(200).json({
      message: "image deleted successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
