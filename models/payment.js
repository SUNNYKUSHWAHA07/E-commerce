const mongoose = require("mongoose");
const Joi = require('joi');

// Define the Payment Schema (Mongoose)
const paymentSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
   paymentId: {
       type: String,
    },
    signature: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
       
    },
    currency:{
       type: String,
       required: true,

    },
    status: {
        type: String,
       default: "pending",
      
    },
}, { timestamps: true });

// Create the Payment model
const Payment = mongoose.model("payment", paymentSchema);

// Joi validation function for Payment



module.exports =  Payment;
