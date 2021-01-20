const productRule = {
  oneIndividualItemForFuorSelected: function (amountSelected = 0) {
    amountSelected = parseInt(amountSelected, 10);
    return amountSelected / 4;
  },
  amountsAreEquals: function (amount = 0) {
    return amount;
  },
  oneIndividualItemForTwoSelected(amount = 0) {
    return parseInt(amount, 10) / 2;
  },
  oneIndividualItemForEightSelected(amount = 0) {
    return parseInt(amount, 10) / 8;
  }
};

module.exports = productRule;