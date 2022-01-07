const connect = require('./connection');

const create = async (name, quantity) => {
  const conn = await connect();
  const { insertedId } = await conn.collection('products').insertOne({ name, quantity });
  return insertedId;
};

const findByName = async (name) => {
  const conn = await connect();
  const product = await conn.collection('products').findOne({ name });
  if (!product) return null;
  return product;
};

module.exports = {
  create,
  findByName,
};