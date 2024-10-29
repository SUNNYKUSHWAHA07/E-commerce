const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
        type: Buffer,
       
    },
}, { timestamps: true });

const Product = mongoose.model("product", productSchema);

const validateProduct = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        price: Joi.number().min(0).required(),
        description: Joi.string().required(),
        category: Joi.string().min(3).max(50).required(),
        stock: Joi.number().required(),
        image: Joi.string().optional()
    });

    return schema.validate(data);
};

module.exports = {
    productModel:Product,
    validateProduct
};


