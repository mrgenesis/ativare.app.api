const express = require('express');
const authMiddleware = require('../middlewares/auth');
const budgetCalc = require('../../services/budgetCalc');

const router = express.Router();

const Budget = require('../models/budget');
const Material = require('../models/material');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    //TODO: adicionar um midlleware
    // permitir acesso somente perfil admin
    let budget = await Budget.find({});

    res.status(200).send([
      ...budget
    ]);
  } catch (error) {
    res.status(500).send('Erro para processar esta solicitação');
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

router.get('/:budgetId', async (req, res) => {
  const { budgetId } = req.params;
  try {
    let budget = await (function () {
      return require('mongoose').Types.ObjectId.isValid(budgetId)
        ? Budget.findById(budgetId)
        : Budget.findOne({ code: budgetId });
    })();
    if (!budget) {
      return res.status(204).send();
    }
    budget = budget.toObject();
    let selectMaterialsAll = await Material.find({});
    let { total, materialsPrivateDetails, budgetFloors } = budgetCalc(budget.productsList, selectMaterialsAll);
    budget['budgetFloors'] = budgetFloors;
    budget['total'] = total;

    if (true) { // TODO: Colocar restrição para executar apenas em logins com perfil admin
      budget['privateDetail'] = {
        materials: materialsPrivateDetails
      };
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

module.exports = app => app.use('/budget', router);