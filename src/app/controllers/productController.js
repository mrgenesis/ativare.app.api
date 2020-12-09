const router = require('express').Router();
const Product = require('../models/product');

router.post('/new', async (req, res) => {
  console.log(req.body);

  const product = await Product.create(req.body);
  res.status(201).send({
    ...product
  });
});

router.get('/automation', async (req, res) => {
  const automationItems = await Product.find({ 
    category: "Automação"
  });
  res.status(200).send([ ...automationItems ]);
});


module.exports = app => app.use('/product', router);