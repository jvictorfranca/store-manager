const connect = require('./connection');

const create = async (name, quantity) => {
  const conn = await connect();
  const { insertedId } = await conn.collection('products').insertOne({ name, quantity });
  return insertedId;
};

module.exports = {
  create,
};