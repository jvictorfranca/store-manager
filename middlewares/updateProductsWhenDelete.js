const { findProductById, updateById } = require('../models/products.model');
const { findSaleById } = require('../models/sales.model');

const updateAProduct = async (productSold) => {
  const { productId, quantity: quantitySold } = productSold;
  let product = await findProductById(productId);
  
  if (!product || product.status) return null;
  
    product = { ...product, quantity: product.quantity + quantitySold };
    return product;
};

const updateProductsWhenDelete = async (req, res, next) => {
  const { id } = req.params;
  const sale = await findSaleById(id);
  if (!sale) { next(); } else {
    const { itensSold } = sale;
    itensSold.forEach(async (productSold) => {
    const product = await updateAProduct(productSold);
    console.log(product);
    if (!product) return res.status(404).json({ message: 'Product Not Found' });
    const { _id, quantity, name } = product;  
    updateById(_id, name, quantity); 
  });

  next(); 
}
};

module.exports = {
  updateProductsWhenDelete,
};