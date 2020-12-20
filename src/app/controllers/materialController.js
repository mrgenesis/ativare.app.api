const router = require('express').Router();
const Material = require('../models/material');

router.get('/', async (req, res) => {
  //TODO: adicionar um midlleware
  // permitir acesso somente perfil admin
  let materials = await Material.find({});

  res.status(200).send({
    ...materials.toObject()
  });
});

router.post('/new', async (req, res) => {


  const material = await Material.create(req.body);
  res.status(201).send({
    ...material.toObject()
  });
});

module.exports = app => app.use('/material', router);
