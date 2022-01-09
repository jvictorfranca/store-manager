const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const connect = require('./connection');

const create = async (name, quantity) => {
  const conn = await connect();
  const { insertedId } = await conn.collection('products').insertOne({ name, quantity });
  return insertedId;
};

const find = async () => {
  const conn = await connect();
  const products = await conn.collection('products').find({ }).toArray();
  if (!products) return null;
  return products;
};

const findByName = async (name) => {
  const conn = await connect();
  const product = await conn.collection('products').findOne({ name });
  if (!product) return null;
  return product;
};

const findProductById = async (id) => {
  const conn = await connect();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { status: 422 }; 
}
  const product = await conn.collection('products').findOne(ObjectId(id));
  if (!product) return null;
  return product;
};

const updateById = async (id, name, quantity) => {
  const conn = await connect();
  const { insertedId } = await
   conn.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
   console.log(insertedId);
  return insertedId;
};

module.exports = {
  create,
  find,
  findByName,
  findProductById,
  updateById,
};