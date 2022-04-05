const router = require('express').Router();
let Product = require('./product.model')
const shortid = require("shortid");

router.route('/').get((req,res) => {
    Product.find()
      .then(Products => res.json(Products))
      .catch(err => res.status(400).json('Error:'+ err));
  });
  router.route('/').post((req, res) =>{
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const price = Number(req.body.price)
    const availableSizes = req.body.availableSizes;
    // availableSize: [String],

    const newProduct = new Product({
        image,
        title,
        description,
        price,
        availableSizes,
    });
    newProduct.save()
     .then(() => res.json('Product added!'))
     .catch(err => res.status(400).json('Error: + err'));
});
router.route('/').get((req,res) => {
  Product.find()
    .then(product => res.json(Product))
    .catch(err => res.status(400).json('Error:'+ err));
});
router.route('/:id').delete((req,res) => {
  Product.findByIdAndDelete(req.params._id)
    .then(product => res.json('Product deleted'))
    .catch(err => res.status(400).json('Error:'+ err));
});


module.exports = router;  