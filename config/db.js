const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOURL).then(function(){
    console.log("connected to mongoDB");
})

module.exports = mongoose.connection