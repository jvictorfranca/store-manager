const NAME_LENGTH_ERROR = '"name" length must be at least 5 characters long';
const QUANTITY_MINIMUM_ERROR = '"quantity" must be larger than or equal to 1';
const PRODUCT_EXISTS_ERROR = 'Product already exists';
const NUMBER_NOT_STRING_ERROR = '"quantity" must be a number';
const INVALID_DATA = 'invalid_data';

const { create, findByName } = require('../models/products.model');

const nameExists = async (name) => {
  const product = await findByName(name);
  if (product) return true;
  return false;
};

const errorObjectCreator = (status, code, message) => ({
    status,
    answer: { err: {
      code, message,
    } },
  });

const createProduct = async (name, quantity) => {
  if (name.length < 5) {
 return errorObjectCreator(422, INVALID_DATA, NAME_LENGTH_ERROR);
} if (typeof quantity !== 'number') {
  return errorObjectCreator(422, INVALID_DATA, NUMBER_NOT_STRING_ERROR);
}
 if (quantity < 1) {
 return errorObjectCreator(422, INVALID_DATA, QUANTITY_MINIMUM_ERROR);
} if (await nameExists(name)) {
  return errorObjectCreator(422, INVALID_DATA, PRODUCT_EXISTS_ERROR);
 } const createdId = await create(name, quantity);
  const createdProduct = {
    _id: createdId, name, quantity,
  };
  return { answer: createdProduct, status: 201,
  };
};

module.exports = {
  createProduct,
};