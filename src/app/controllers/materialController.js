const router = require('express').Router();
const Material = require('../models/material');

router.get('/', async (req, res) => {
  if (!req.app.locals.isAdmin) {
    return res.status(403).send([]);
  }

  try {
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

  if (!req.app.locals.isAdmin) {
    return res.status(403).send({});
  }
  const material = await Material.create(req.body);
  res.status(201).send({
    ...material.toObject()
  });
});

router.post('/edit', async (req, res) => {
  if (!req.app.locals.isAdmin) {
    return res.status(403).send({});
  }
  const materialUpdate = req.body;
  try {
    if (!materialUpdate.code) {
      throw new Error('A propriedade code não foi informada.');
    }
    const codeProperty = { code: materialUpdate.code };
    const set = { '$set': { name: materialUpdate.name, unitPrice: materialUpdate.unitPrice } }
    const getNew = { new: true };
    const material = await Material.findOneAndUpdate(codeProperty, set, getNew);

    if (!material) {
      res.status(204).send({});
    }
    return res.status(201).send({
      ...material.toObject()
    });

  } catch (err) {
    console.error(err);
    res.status(400).send({ Error: 'Não foi possível processar esta solicitação' })
  }
});

router.get('/:materialId', async (req, res) => {
  if (!req.app.locals.isAdmin) {
    return res.status(403).send({});
  }
  const { materialId } = req.params;

  try {
    //TODO: adicionar um midlleware
    // permitir acesso somente perfil admin
    let material = await Material.findOne({ code: materialId });

    if (!material) {
      return res.status(204).send();
    }
    console.error(material);
    material = material.toObject();

    res.status(200).send({ ...material });

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
module.exports = app => app.use('/material', router);
