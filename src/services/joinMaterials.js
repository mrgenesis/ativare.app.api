const productRules = require('./productRules');

function joinMaterials(joinedProducts) {
  let joinedMaterials = {};
  let amount = 0;

  for (let product of joinedProducts) {
    product.materials.map(material => {
      amount = product.amount;
      if (joinedMaterials[material._id]) {
        joinedMaterials[material._id].amount += productRules[material.rule](amount);
      }
      else {
        joinedMaterials[material._id] = {
          _id: material._id,
          amount: productRules[material.rule](amount)
        };
      }

    });

  }
  return joinedMaterials;
}

module.exports = joinMaterials;