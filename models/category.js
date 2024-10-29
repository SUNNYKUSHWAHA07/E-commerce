const mongoose = require("mongoose");
const Joi = require('joi');

// Define the Category Schema (Mongoose)
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    }
}, { timestamps: true }); // Optional: add timestamps for createdAt and updatedAt

// Create the Category model
const Category = mongoose.model("category", categorySchema);

// Joi validation function for Category
const validateCategory = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required()
    });

    return schema.validate(data);
};

module.exports = {
    categoryModel :Category,
    validateCategory
};
