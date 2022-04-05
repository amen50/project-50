const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require("shortid");

const productSchema = new Schema(
    {
        _id: { type: String, default: shortid.generate},
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSizes: [String],
    
    },    
        {
            timestamps: true,
        }
    
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;