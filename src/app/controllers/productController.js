const router = require('express').Router();
const Product = require('../models/product');
const { isAuthAndRole } = require('../helpers/authInfoValidations');

router.get('/', (req, res) => {
  isAuthAndRole(req, 'admin', async (isAllowedOrIsCode, ErrorMsg) => {
    if (isAllowedOrIsCode === 'allowed') {
      try {
        let product = await Product.find({});

        res.status(200).send([
          ...product
        ]);
      } catch (error) {
        res.status(500).send('Erro para processar esta solicitação');
      }
    } else {
      res.status(isAllowedOrIsCode).send({ Error: ErrorMsg });
    }
  });


});

router.post('/new', async (req, res) => {
  isAuthAndRole(req, 'admin', async (isAllowedOrIsCode, ErrorMsg) => {
    if (isAllowedOrIsCode === 'allowed') {
      try {
        const product = await Product.create(req.body);
        res.status(201).send({
          ...product
        });

      } catch (error) {
        res.status(500).send('Erro para processar esta solicitação');
      }
    } else {
      res.status(isAllowedOrIsCode).send({ Error: ErrorMsg });
    }
  });

});

router.get('/automation', async (req, res) => {
  isAuthAndRole(req, 'basic', async (isAllowedOrIsCode, ErrorMsg) => {
    if (isAllowedOrIsCode === 'allowed') {
      try {
        const automationItems = await Product.find({
          category: "Automação"
        });
        res.status(200).send([...automationItems]);

      } catch (error) {
        res.status(500).send('Erro para processar esta solicitação');
      }
    } else {
      res.status(isAllowedOrIsCode).send({ Error: ErrorMsg });
    }
  });
});
router.post('/edit', async (req, res) => {
  isAuthAndRole(req, 'admin', async (isAllowedOrIsCode, ErrorMsg) => {
    if (isAllowedOrIsCode === 'allowed') {
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
    } else {
      res.status(isAllowedOrIsCode).send({ Error: ErrorMsg });
    }
  });
});

router.get('/:productId', async (req, res) => {
  isAuthAndRole(req, 'admin', async (isAllowedOrIsCode, ErrorMsg) => {
    if (isAllowedOrIsCode === 'allowed') {
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
    } else {
      res.status(isAllowedOrIsCode).send({ Error: ErrorMsg });
    }
  });
});

module.exports = app => app.use('/product', router);