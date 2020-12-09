const express = require('express');
const authMiddleware = require('../middlewares/auth');
const productRules = require('../../services/productRules');

const router = express.Router();

const Budget = require('../models/budget');
const Material = require('../models/material');

//router.use(authMiddleware);

router.get('/:budgetId', async (req, res) => {
  const { budgetId } = req.params;
  try {
    let budget = await Budget.findById(budgetId);
    let selectMaterialsAll = await Material.find({});
    budget = budget._doc;

    budget['total'] = 0;
    budget['privateDetail'] = {
      products: {}
    };
    
    let joinedProducts = {};
    // Junta item iguais e soma os valores da propriedade 'amount'
    for (const product of Object.values(budget.productsList)) { // Contagem dos itens iguais
        if (joinedProducts[product._id]) { // id já existe, somar amount
            joinedProducts[product._id].amount += product.amount;
        } else { // id não existe, criar o objeto com o amount inicial
            joinedProducts[product._id] = { ...product };
        }
    } 
    
    // Add preços unitários nos produtos da lista
    // Add a quantidade de cada material de acordo com o montante selecionado
    for (const k in joinedProducts) { //o valor de 'k' será algo parecido com '5fcebebaef72e11a9a790335'. É a _id do produto
      joinedProducts[k].materials.map((materialsOfProduct, index) => { // 'materialsOfProduct' é exatamente igual (===) a 'joinedProducts[k].materials[index]'.
        selectMaterialsAll.find(obj => {
          if(obj._id == materialsOfProduct._id) {
            joinedProducts[k].materials[index] = { ...joinedProducts[k].materials[index], unitPrice: obj.unitPrice }; // Add preço
            joinedProducts[k].materials[index].configAmount = productRules[joinedProducts[k].materials[index].rule](joinedProducts[k].amount); // cofigura quantidade usando "rule"
            joinedProducts[k].materials[index].subTotal = joinedProducts[k].materials[index].configAmount * joinedProducts[k].materials[index].unitPrice; // Calc o subtotal
            budget['total'] += joinedProducts[k].materials[index].subTotal;
          }
        });
      });
    } 

    if (true) { // TODO: Colocar restrição para executar apenas em logins com perfil admin
      budget.privateDetail.products = Object.values(joinedProducts);
    }

    res.send({
      ...budget
    });

  } catch (err){
    console.log(err);
  }

  
});
router.post('/create', async (req, res) => {
    const budget = await Budget.create({
      ...req.body,
      ownId: req.userId
    });
  res.send({
    budget
  });
});


module.exports = app => app.use('/budget', router);