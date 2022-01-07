const { createProduct } = require('../services/products.service');

const createProductController = async (req, res, _next) => {
  const { name, quantity } = req.body;
  const answerObject = await createProduct(name, quantity);
  return res.status(answerObject.status).json(answerObject.answer);
};

module.exports = {
  createProductController,
};