const joinEqualsFloors = require('./joinEqualsFloors');
const {
  budgetProductsList,
  oneItemWithoutFloorProperty
} = require('../../dataTests/budgetProductsList');

describe('Testing if join the equals floor correctly.', function () {
  it('If don\'t send nothing as parameter return error', function () {
    expect(() => joinEqualsFloors()).toThrow('Don\'t sent a object');
  });

  it('If don\'t have "floor" property in product return error', function () {
    expect(() => joinEqualsFloors(oneItemWithoutFloorProperty))
      .toThrow('The product should have floor property');
  });

  it('Joined success return property "joinedProductsTheKeyAreItsFloor" e "floorsNames"', function () {
    expect(joinEqualsFloors(budgetProductsList))
      .toHaveProperty('joinedProductsTheKeyAreItsFloor');
    expect(joinEqualsFloors(budgetProductsList))
      .toHaveProperty('floorsNames');
  });
});