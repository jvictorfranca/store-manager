const { create } = require('../models/sales.model');

const INVALID_DATA = 'invalid_data';
const WRONG_ID_QUANTITY = 'Wrong product ID or invalid quantity';

// const nameExists = async (name) => {
//   const product = await findByName(name);
//   if (product) return true;
//   return false;
// };

// const idExists = async (id) => {
//   const product = await findProductById(id);
//   if (product) return true;
//   return false;
// };

const errorObjectCreator = (status, code, message) => ({
    status,
    answer: { err: {
      code, message,
    } },
  });

const isQuantityInvalid = (array) => {
  const validationArray = [];
  array.forEach((item) => {
    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      validationArray.push(false);
    } else { validationArray.push(true); }
  });
  const includesFalse = validationArray.includes(false);
    return includesFalse;
};

const createSales = async (salesArray) => {
  if (isQuantityInvalid(salesArray)) {
 return errorObjectCreator(422, INVALID_DATA, WRONG_ID_QUANTITY);
} const createdId = await create(salesArray);
  const createdSales = {
    _id: createdId, itensSold: salesArray,
  };
  return { answer: createdSales, status: 200,
  };
};

module.exports = {
  createSales,
};