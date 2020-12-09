const productRule = {
  oneIndividualItemForFuorSelected: function (amountSelected = 0) {
    amountSelected = parseInt(amountSelected, 10);
    return Math.ceil(amountSelected / 4);
  },
  expansao212_24V: function (
    amount_persianaMotorizada,
    outrosItems
    ) {

  }

};


module.exports = productRule;