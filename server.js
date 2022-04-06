const express = require('express');
const cors = require('cors');
const connectionDb = require('./connection');

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

app.use('/products', products_rout);

 

app.listen(port, () => {

       console.log(`Server is running on port: ${port}`);
});