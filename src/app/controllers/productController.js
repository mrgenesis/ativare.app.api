const router = require('express').Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
  //TODO: adicionar um midlleware
  // permitir acesso somente perfil admin
  let product = await Product.find({});

  res.status(200).send({
    ...product.toObject()
  });
});

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
  res.status(200).send([...automationItems]);
});


module.exports = app => app.use('/product', router);