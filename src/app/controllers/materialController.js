const router = require('express').Router();
const Material = require('../models/material');

router.get('/', async (req, res) => {
  //TODO: adicionar um midlleware
  // permitir acesso somente perfil admin
  let materials = await Material.find({});

  res.status(200).send(materials);
});

router.post('/new', async (req, res) => {
  console.log(req.body);

  const material = await Material.create(req.body);
  res.status(201).send({
    id: material.id
  });
});

module.exports = app => app.use('/material', router);
