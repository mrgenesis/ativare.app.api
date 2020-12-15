const productRule = require('./productRules');

describe('Calc rules', function () {
  it('amountsAreEquals: 1/1 Selected', function () {
    expect(productRule.amountsAreEquals(5)).toBe(5);
  });
  it('oneIndividualItemForFuorSelected: 1/4 Selected', function () {
    expect(productRule.oneIndividualItemForFuorSelected(5)).toBe(1.25);
    expect(productRule.oneIndividualItemForFuorSelected(4)).toBe(1);
  })
})