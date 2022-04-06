
const mongoose = require('mongoose');

const URI = "mongodb+srv://amen:8P9pk.wXR5dGiwq@cluster0.xeigs.mongodb.net/test?retryWrites=true&w=majority";
 
const connectionDb = async () => 
{
    await mongoose.connect(URI, {
             
            useUnifiedTopology: true,
            useNewUrlParser: true
    });
    console.log("it works!");
};

module.exports = connectionDb;