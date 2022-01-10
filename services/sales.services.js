const { create, find, findSaleById, updateById, deleteById } = require('../models/sales.model');

const INVALID_DATA = 'invalid_data';
const NOT_FOUND = 'not_found';
const WRONG_ID_QUANTITY = 'Wrong product ID or invalid quantity';
const SALE_NOT_FOUND = 'Sale not found';
const WRONG_SALE_ID_FORMAT = 'Wrong sale ID format';

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

const findAllSales = async () => {
  const sales = await find();
  return { sales };
};

const findSaleByIdService = async (id) => {
  const sale = await findSaleById(id);
  if (!sale) return errorObjectCreator(404, NOT_FOUND, SALE_NOT_FOUND);
  if (sale.status) return errorObjectCreator(404, INVALID_DATA, WRONG_ID_QUANTITY);
  return { ...sale };
};

const updateSaleByIdService = async (id, salesArray) => {
  if (isQuantityInvalid(salesArray)) {
    return errorObjectCreator(422, INVALID_DATA, WRONG_ID_QUANTITY);
   }
      const insertedId = await updateById(id, salesArray);
      if (!insertedId) return errorObjectCreator(404, NOT_FOUND, SALE_NOT_FOUND);
      
     const createdProduct = {
       _id: id,
       itensSold: salesArray,
     };
     return { answer: createdProduct, status: 200,
     };
};

const deleteSaleByIdService = async (id) => {
  // if (!(await idExists(id))) {
  //   return errorObjectCreator(422, INVALID_DATA, WRONG_ID_FORMAT); 
// }
  const sale = await findSaleById(id);
  if (!sale) return errorObjectCreator(422, INVALID_DATA, WRONG_SALE_ID_FORMAT);
  if (sale.status === 422) return errorObjectCreator(422, INVALID_DATA, WRONG_SALE_ID_FORMAT);
  await deleteById(id);
     return { answer: { ...sale }, status: 200,
     };
};

module.exports = {
  createSales,
  findSaleByIdService,
  findAllSales,
  updateSaleByIdService,
  deleteSaleByIdService,
};