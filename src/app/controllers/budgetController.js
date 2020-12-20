const express = require('express');
const authMiddleware = require('../middlewares/auth');
const budgetCalc = require('../../services/budgetCalc');

const router = express.Router();

const Budget = require('../models/budget');
const Material = require('../models/material');

//router.use(authMiddleware);

router.get('/', async (req, res) => {
  //TODO: adicionar um midlleware
  // permitir acesso somente perfil admin
  let budget = await Budget.find({});

  res.status(200).send({
    ...budget.toObject()
  });
});

router.get('/:budgetId', async (req, res) => {
  const { budgetId } = req.params;
  try {
    let budget = await Budget.findById(budgetId);
    let selectMaterialsAll = await Material.find({});
    let { total, privateDetail } = budgetCalc(budget._doc.productsList, selectMaterialsAll);
    budget = budget._doc;

    console.log('total: ' + total, privateDetail)

    budget['total'] = total;
    budget['privateDetail'] = [];

    if (true) { // TODO: Colocar restrição para executar apenas em logins com perfil admin
      budget.privateDetail = privateDetail;
    }

    res.status(200).send({
      ...budget
    });

  } catch (err) {
    res.status(500).send({
      error: 'Não consegui processar esta solicitação.'
    });
    console.error(err);
  }

});
router.post('/create', async (req, res) => {

  try {
    const budget = await Budget.create({
      ...req.body,
      ownId: req.userId
    });
    res.status(201).send({
      _id: budget._id
    });
  } catch (err) {
    res.status(500).send({
      error: 'Não consegui processar esta solicitação.'
    });
    console.error(err);
  }
});


module.exports = app => app.use('/budget', router);