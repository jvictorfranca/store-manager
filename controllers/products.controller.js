const { 
  createProduct,
  findAllProducts,
  findProductByIdService,
  updateProductByIdService,
 } = require('../services/products.service');

const createProductController = async (req, res, _next) => {
  const { name, quantity } = req.body;
  const answerObject = await createProduct(name, quantity);
  return res.status(answerObject.status).json(answerObject.answer);
};

const findAllProductsController = async (_req, res, _next) => {
  const products = await findAllProducts();
  if (!products) return res.status(400).json({ message: 'Not Found' });
  return res.status(200).json(products);
};

const findProductByIdController = async (req, res, _next) => {
  const { id } = req.params;
  const product = await findProductByIdService(id);
  if (!product) return res.status(400).json({ message: 'Not Found' });
  if (product.status) {
    return res.status(product.status).json(product.answer); 
}
  return res.status(200).json(product);
};

const updateProductByIdController = async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await updateProductByIdService(id, name, quantity);
  if (!product) return res.status(400).json({ message: 'Not Found' });
  if (product.status) {
    return res.status(product.status).json(product.answer); 
}
  return res.status(200).json(product);
};

module.exports = {
  createProductController,
  findAllProductsController,
  findProductByIdController,
  updateProductByIdController,
};