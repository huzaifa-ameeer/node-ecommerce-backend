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
      !orderItems ||
      !paymentMethod ||
      !paymentInfo ||
      itemPrice === undefined ||
      tax === undefined ||
      totalAmount === undefined ||
      shippingCharges === undefined ||
      !orderStatus
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required order fields",
      });
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
