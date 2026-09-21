import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: [true, "address is required"],
      },
      city: {
        type: String,
        required: [true, "city name is required"],
      },
      country: {
        type: String,
        required: [true, "country name is required"],
      },
    },
    orderItems: [
      {
        productName: {
          type: String,
          required: [true, "product name is required"],
        },
        productPrice: {
          type: Number,
          required: [true, "product price is required"],
        },
        productQuantity: {
          type: Number,
          required: [true, "product quantity is required"],
        },
        productImage: {
          type: String,
          required: [true, "product image is required"],
        },
        product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
        }   
      },
    ],
    paymentMethod: {
        type: String,
        enum: ["COD", "ONLINE"],
        default: "COD"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user id is required"]
    },
    paidAt: Date,
    paymentInfo: {
      type: String,
      status: String
    },
    itemPrice: {
      type: Number,
      required: [true, "item price is required"]
    },
    tax: {
      type: Number,
      required: [true, "tax price is required"]
    },
    totalAmount: {
      type: Number,
      required: [true, "item total amount price is required"]
    },
    shippingCharges: {
      type: Number,
      required: [true, "item shippingCharges are required"]
    },
    orderStatus: {
      type: String,
      enum: ["processing", "delievered", "shipped"],
      default: "processing"
    },
    delieveredAt: Date
  },
  { timestamps: true },
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
