const { createSales } = require('../services/sales.services');

const createSaleController = async (req, res, _next) => {
  const salesArray = req.body;
  const answerObject = await createSales(salesArray);
  return res.status(answerObject.status).json(answerObject.answer);
};

module.exports = {
  createSaleController,
};