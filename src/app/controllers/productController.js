const router = require('express').Router();
const Product = require('../models/product');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    //TODO: adicionar um midlleware
    // permitir acesso somente perfil admin
    let product = await Product.find({});

    res.status(200).send([
      ...product
    ]);
  } catch (error) {
    res.status(500).send('Erro para processar esta solicitação');
  }
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
router.post('/edit', async (req, res) => {
  const productUpdate = req.body;
  try {
    if (!productUpdate.code) {
      throw new Error('A propriedade code não foi informada.');
    }
    const codeProperty = { code: productUpdate.code };
    const set = { '$set': { name: productUpdate.name, description: productUpdate.description } }
    const getNew = { new: true };
    const product = await Product.findOneAndUpdate(codeProperty, set, getNew);

    if (!product) {
      res.status(204).send({});
    }
    return res.status(201).send({
      ...product.toObject()
    });

  } catch (err) {
    console.error(err);
    res.status(400).send({ Error: 'Não foi possível processar esta solicitação' })
  }
});

router.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findOne({ code: productId });
    res.status(200).send({
      ...product.toObject()
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Erro ao processar a solicitação' });
  }

});

module.exports = app => app.use('/product', router);