import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";

//create order controller
export const createOrderController = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      tax,
      totalAmount,
      shippingCharges,
      orderStatus,
    } = req.body;

    if (
      !shippingInfo ||
      !Array.isArray(orderItems) ||
      orderItems.length === 0 ||
      !paymentMethod ||
      itemPrice === undefined ||
      tax === undefined ||
      totalAmount === undefined ||
      shippingCharges === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required order fields",
      });
    }

    for (const item of orderItems) {
      if (!item.product || !Number.isInteger(item.quantity) || item.quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Each order item must include a product and a valid quantity",
        });
      }

      const product = await productModel.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.product} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }
    }

    await orderModel.create({
      user: req.user._id,
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      tax,
      totalAmount,
      shippingCharges,
      orderStatus,
      ...(paymentInfo !== undefined && { paymentInfo }),
    });

    for (let i = 0; i < orderItems.length; i++) {
      const product = await productModel.findById(orderItems[i].product);
      product.stock -= orderItems[i].quantity;
      await product.save();
    }

    return res.status(201).json({
      message: "order placed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
