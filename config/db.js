const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    bufferCommands: false, 
}).then(function() {
    console.log("connected to mongoDB");
}).catch(function(err) {
    console.error("MongoDB connection error:", err);
});

module.exports = mongoose.connection;