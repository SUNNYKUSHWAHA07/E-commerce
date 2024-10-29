const mongoose = require("mongoose");
const Joi = require('joi');

// Define the Order Schema (Mongoose)
const orderSchema = mongoose.Schema({
    orderId:{
        type:"String",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    address: {
        type: String,
     
        minlength: 5,
        maxlength: 255
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payment"
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "delivery"
    }
}, { timestamps: true });

const Order = mongoose.model("order", orderSchema);

const validateOrder = (data) => {
    const schema = Joi.object({
        user: Joi.string().required(),
        product: Joi.array().items(Joi.string()).required(),
        totalPrice: Joi.number().min(0).required(),
        address: Joi.string().min(5).max(255).required(),
        status: Joi.string().valid('pending', 'processed', 'shipped', 'delivered', 'cancelled').required(),
        payment: Joi.string().optional(),
        delivery: Joi.string().optional()
    });

    return schema.validate(data);
};

module.exports = {
    orderModel:Order,
    validateOrder
};


