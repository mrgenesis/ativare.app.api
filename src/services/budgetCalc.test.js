const budgetCalc = require('./budgetCalc');
const { budgetProductsList, materialsList } = require('../../dataTests/budgetProductsList');

describe('Calc values of budget and get properties to the main object', function () {
  it('Set total amount e private detail with rule base', function () {
    expect(budgetCalc(budgetProductsList, materialsList)).toHaveProperty('total');
    expect(budgetCalc(budgetProductsList, materialsList)).toHaveProperty('privateDetail');
  });
});