const mongoose = require('mongoose')



mongoose.connect(process.env.MONGOURL,{
    serverSelectionTimeoutMS: 30000,
    bufferCommands: false, 
}).then(function(){
    console.log("connected to mongoDB");
})

module.exports = mongoose.connection