// const Mongoose = require('mongoose');
// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (salesArray) => {
  const conn = await connect();
  const { insertedId } = await conn.collection('sales').insertOne({ itensSold: salesArray });
  return insertedId;
};

const find = async () => {
  const conn = await connect();
  const sales = await conn.collection('sales').find({ }).toArray();
  if (!sales) return null;
  return sales;
};

const findSaleById = async (id) => {
  const conn = await connect();
//   if (!Mongoose.Types.ObjectId.isValid(id)) {
//     return { status: 422 }; 
// }
  const sale = await conn.collection('sales').findOne({ _id: id });
  if (!sale) return null;
  return sale;
};

module.exports = {
  create,
  find,
  findSaleById,
};