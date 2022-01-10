const {
  createSales,
  findAllSales,
  findSaleByIdService,
  updateSaleByIdService,
  deleteSaleByIdService,
} = require('../services/sales.services');

const createSaleController = async (req, res, _next) => {
  const salesArray = req.body;
  const answerObject = await createSales(salesArray);
  return res.status(answerObject.status).json(answerObject.answer);
};

const findAllSalesController = async (_req, res, _next) => {
  const sales = await findAllSales();
  if (!sales) return res.status(400).json({ message: 'invalid_data' });
  return res.status(200).json(sales);
};

const findSaleByIdController = async (req, res, _next) => {
  const { id } = req.params;
  const sale = await findSaleByIdService(id);
  if (!sale) return res.status(400).json({ message: 'invalid_data' });
  if (sale.status) {
    return res.status(sale.status).json(sale.answer); 
}
  return res.status(200).json(sale);
};

const updateSaleByIdController = async (req, res, _next) => {
  const { id } = req.params;
  const salesArray = req.body;
  const sale = await updateSaleByIdService(id, salesArray);
  if (!sale) return res.status(400).json({ message: 'Not Found' });
  if (sale.status) {
    return res.status(sale.status).json(sale.answer); 
}
  return res.status(200).json(sale);
};

const deleteSaletByIdController = async (req, res, _next) => {
  const { id } = req.params;
  const sale = await deleteSaleByIdService(id);
  if (!sale) return res.status(422).json({ message: 'Not Found' });
  if (sale.status) {
    return res.status(sale.status).json(sale.answer); 
}
  return res.status(200).json(sale);
};

module.exports = {
  createSaleController,
  findSaleByIdController,
  findAllSalesController,
  updateSaleByIdController,
  deleteSaletByIdController,
};