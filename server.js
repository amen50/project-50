const express = require('express');
const cors = require('cors');
const connectionDb = require('./connection');
const mongoose = require("mongoose");


require('dotenv').config();

connectionDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// const uri= process.env.ATLAS_URI;
// mongoose.connection = (uri, {useNewUrlParser: true, useCreateIndex: true}
//        );
// const connection = mongoose.connection;
// connection.once('open', () => {
//          console.log("MangoDb database connection established successfully");
//  })

const products_rout = require('./products');
const { mongo, Mongoose } = require('mongoose');
const shortid = require('shortid');

app.use('/products', products_rout);

const Order = mongoose.model(
       "order",
       new mongoose.Schema(
         {
           _id: {
             type: String,
             default: shortid.generate,
           },
           email: String,
           name: String,
           address: String,
           total: Number,
           cartItems: [
             {
               _id: String,
               title: String,
               price: Number,
               count: Number,
             },
           ],
         },
         {
           timestamps: true,
         }
       )
     );
     app.post("/api/orders", async (req, res) => {
       if (
         !req.body.name ||
         !req.body.email ||
         !req.body.address ||
         !req.body.total ||
         !req.body.cartItems
       ) {
         return res.send({ message: "Data is required." });
       }
       const order = await Order(req.body).save();
       res.send(order);
     });
     app.get("/api/orders", async (req, res) => {
       const orders = await Order.find({});
       res.send(orders);
     });
     app.delete("/api/orders/:id", async (req, res) => {
       const order = await Order.findByIdAndDelete(req.params.id);
       res.send(order);
     });
app.listen(port, () => {

       console.log(`Server is running on port: ${port}`);
});