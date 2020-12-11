const joinEqualsProducts = require('./joinEqualsProducts');
const {
  budgetProductsList,
  oneItemWithoutProperty_id, 
  oneItemWithoutPropertyAmount,
  propertyAmountIsNotNumber
} = require('../../dataTests/budgetProductsList');

describe('Testing if join the products correctly.', function () {
  it('If don\'t send nothing as parameter return error', function (){
    expect(() => joinEqualsProducts()).toThrow('Don\'t sent a object');
  });

  it('If don\'t have "_id" property in product return error', function () {
    expect(() => joinEqualsProducts(oneItemWithoutProperty_id))
      .toThrow('Product of list without property _id');
  });

  it('If don\'t have "amount" property return error', function () {
    expect(() => joinEqualsProducts(oneItemWithoutPropertyAmount))
      .toThrow('Product of list without property amount');
  });
  it('If amount is not number return error', function () {
    expect(() => joinEqualsProducts(propertyAmountIsNotNumber))
      .toThrow('The property "amount" should be number');
  });
  
  it('Joined success return property "joinedProductsTheKeyAreItsIds", "joinedProductsId" e "joinedProductsObj"', function () {
    expect(joinEqualsProducts(budgetProductsList))
      .toHaveProperty('joinedProductsTheKeyAreItsIds');
    expect(joinEqualsProducts(budgetProductsList))
      .toHaveProperty('joinedProductsId');
    expect(joinEqualsProducts(budgetProductsList))
      .toHaveProperty('joinedProductsObj');
  });
});