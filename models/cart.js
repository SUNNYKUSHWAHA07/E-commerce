const mongoose = require("mongoose");
const Joi = require('joi');

// Define the Cart Schema (Mongoose)
const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    products: [
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
    }
}, { timestamps: true });

// Create the Cart model
const Cart = mongoose.model("cart", cartSchema);

// Joi validation function for Cart
const validateCart = (data) => {
    const schema = Joi.object({
        user: Joi.string().required(),
        products: Joi.array().items(Joi.string()).required(),
        totalPrice: Joi.number().min(0).required()
    });

    return schema.validate(data);
};

module.exports = {
    cartModel :Cart,
    validateCart
};
