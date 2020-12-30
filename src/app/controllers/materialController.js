const router = require('express').Router();
const Material = require('../models/material');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  console.log('req.headers.authorization', req.headers.authorization)
  try {
    //TODO: adicionar um midlleware
    // permitir acesso somente perfil admin
    let materials = await Material.find({});

    res.status(200).send([
      ...materials
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


router.post('/new', async (req, res) => {


  const material = await Material.create(req.body);
  res.status(201).send({
    ...material.toObject()
  });
});

router.get('/:materialId', async (req, res) => {
  const { materialId } = req.params;

  try {
    //TODO: adicionar um midlleware
    // permitir acesso somente perfil admin
    let material = await Material.findOne({ code: materialId });

    if (!material) {
      return res.status(204).send();
    }

    material = material.toObject();

    res.status(200).send({ ...material });

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
module.exports = app => app.use('/material', router);
