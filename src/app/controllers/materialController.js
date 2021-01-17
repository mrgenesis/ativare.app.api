const router = require('express').Router();
const { isAuthAndRole } = require('../helpers/authInfoValidations');
const Material = require('../models/material');

router.get('/', async (req, res) => {
  isAuthAndRole(req, 'admin', async (isAllowedOrIsCode, ErrorMsg) => {
    if (isAllowedOrIsCode === 'allowed') {

      try {
        let materials = await Material.find({});

        res.status(200).send([
          ...materials
        ]);
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
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
        const material = await Material.create(req.body);
        res.status(201).send({
          ...material.toObject()
        });
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    } else {
      res.status(isAllowedOrIsCode).send({ Error: ErrorMsg });
    }
  });
});

router.post('/edit', async (req, res) => {
  isAuthAndRole(req, 'admin', async (isAllowedOrIsCode, ErrorMsg) => {
    if (isAllowedOrIsCode === 'allowed') {
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
    } else {
      res.status(isAllowedOrIsCode).send({ Error: ErrorMsg });
    }
  });
});

router.get('/:materialId', async (req, res) => {
  isAuthAndRole(req, 'admin', async (isAllowedOrIsCode, ErrorMsg) => {
    if (isAllowedOrIsCode === 'allowed') {

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
    } else {
      res.status(isAllowedOrIsCode).send({ Error: ErrorMsg });
    }
  });

});
module.exports = app => app.use('/material', router);
