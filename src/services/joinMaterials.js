const productRules = require('./productRules');

function joinMaterials(joinedProducts) {
  let joinedMaterials = {};
  let amount = 0;

  for (let product of joinedProducts) {
    product.materials.map(material => {
      amount = product.amount;
      if (joinedMaterials[material._id]) {
        joinedMaterials[material._id].totalAmountInProducts += amount;
        joinedMaterials[material._id].amountCalc += productRules[material.rule](amount);
      }
      else {
        joinedMaterials[material._id] = {
          _id: material._id,
          totalAmountInProducts: amount,
          amountCalc: productRules[material.rule](amount),
          rule: material.rule
        };
      }

    });

  }
  return joinedMaterials;
}

module.exports = joinMaterials;