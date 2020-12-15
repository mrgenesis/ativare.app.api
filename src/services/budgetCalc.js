const joinEqualsFloors = require('./joinEqualsFloors');
const joinEqualsProducts = require('./joinEqualsProducts');
const joinMaterials = require('./joinMaterials');


function budgetCalc(products = '', materialsList) {

  // join per floors
  let joinPerFloors = {}

    // join equals products per floor
    , joinEqualsProductsPerFloor = {}

    // join equals materials per floor
    , joinEqualsMaterials = {}

    // Total per material
    , subTotal = 0

    // Totala value of budget
    , total = 0

    // Material list of budget joined per floor
    , materialListOfBudget

    // Find material of list of DB
    , findMaterialOfList

    // Private values avaliable only to admin users
    , privateDetail = [];


  // Join products the same as floor. 
  // {floor1: {prod, prod}, floor2: {prod, prod}}
  joinPerFloors = joinEqualsFloors(products);

  // Join equals products.
  // {floor1: {2x prod}, floor2: {2x prod}}
  joinPerFloors.floorsNames.map((floor) => {
    joinEqualsProductsPerFloor[floor] = [...joinEqualsProducts(joinPerFloors.joinedProductsTheKeyAreItsFloor[floor]).joinedProductsObj];
  });

  for (let floor in joinEqualsProductsPerFloor) { // "i" are the floors
    joinEqualsMaterials[floor] = joinMaterials(joinEqualsProductsPerFloor[floor]);

    materialListOfBudget = Object.values(joinEqualsMaterials[floor]);

    materialListOfBudget.map((material, idx) => {
      findMaterialOfList = materialsList.find(item => item._id == material._id);
      materialListOfBudget[idx] = { floor: floor, ...material, ...findMaterialOfList };
      materialListOfBudget[idx].subTotal = Math.ceil(materialListOfBudget[idx].amount) * materialListOfBudget[idx].unitPrice;
      total += materialListOfBudget[idx].subTotal;
      privateDetail.push(materialListOfBudget[idx]);
    });

  }

  return { total, privateDetail };

}
module.exports = budgetCalc;