const productRule = {
  oneIndividualItemForFuorSelected: function (amountSelected = 0) {
    amountSelected = parseInt(amountSelected, 10);
    return amountSelected / 4;
  },
  amountsAreEquals: function (amount = 0) {
    return amount;
  },
};

module.exports = productRule;