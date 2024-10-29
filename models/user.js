const mongoose = require("mongoose");
const Joi = require('joi');

// Address Schema (Mongoose)
const AddressSchema = mongoose.Schema({
    state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    zip: {
        type: Number,
        required: true,
        min: 10000,
        max: 999999
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
});

// User Schema (Mongoose)
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    password: {
        type: String,
       
        minlength: 6,
        maxlength: 1024
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: {
        type: Number,
        
        minlength: 10,
        maxlength: 15
    },
    addresses: {
        type: [AddressSchema],
        required: true,
       
    }
}, {timestamps: true});

// Create the User model
const User = mongoose.model("user", userSchema);

// Joi validation function for User
const validateUser = (data) => {
    const addressJoiSchema = Joi.object({
        state: Joi.string().min(2).max(50).required(),
        zip: Joi.number().integer().min(10000).max(99999).required(),
        city: Joi.string().min(2).max(50).required(),
        address: Joi.string().min(5).max(255).required(),
    });

    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
        email: Joi.string().email().required(),
        phone: Joi.number().integer().min(1000000000).max(999999999999999).required(),
        addresses: Joi.array().items(addressJoiSchema).min(1).required()
    });

    return schema.validate(data);
};

module.exports = {
    userModel : User,
    validateUser
};
