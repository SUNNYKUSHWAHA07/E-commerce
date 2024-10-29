const mongoose = require("mongoose");
const Joi = require('joi');

// Define the Admin Schema (Mongoose)
const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
       
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    role: {
        type: String,
        required: true,
        enum: ['superadmin', 'admin', 'moderator'],
        default: 'admin'
    }
}, { timestamps: true });

// Create the Admin model
const Admin = mongoose.model("admin", adminSchema);

// Joi validation function for Admin
const validateAdmin = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
        email: Joi.string().email().required(),
        role: Joi.string().valid('superadmin', 'admin', 'moderator').required()
    });

    return schema.validate(data);
};

module.exports = {
   adminModel: Admin,
    validateAdmin
};


