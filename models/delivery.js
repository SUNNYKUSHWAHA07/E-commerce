const mongoose = require("mongoose");
const Joi = require('joi');

// Define the Delivery Schema (Mongoose)
const deliverySchema = mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: true
    },
    deliveryBoy: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    trackingURL: {
        type: String,
  
    },
    estimatedDeliveryTime: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });


const Delivery = mongoose.model("delivery", deliverySchema);


const validateDelivery = (data) => {
    const schema = Joi.object({
        order: Joi.string().required(),
        deliveryBoy: Joi.string().min(3).max(255).required(),
        status: Joi.string().valid('pending', 'shipped', 'delivered', 'cancelled').required(),
        trackingURL: Joi.string().uri(),
        estimatedDeliveryTime: Joi.number().min(0).required()
    });

    return schema.validate(data);
};

module.exports = {
    deliveryModel:Delivery,
    validateDelivery
};
