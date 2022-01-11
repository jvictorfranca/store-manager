const { findProductById, updateById } = require('../models/products.model');

const STOCK_PROBLEM_OBJECT = {
  err: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

const updateAProduct = async (productSold) => {
  const { productId, quantity: quantitySold } = productSold;
  let product = await findProductById(productId);
  
  if (!product || product.status) return null;
  
    product = { ...product, quantity: product.quantity - quantitySold };
    return product;
};

const updateProductsWhenSale = async (req, res, next) => {
  const sales = req.body;
  sales.forEach(async (productSold) => {
    try {
    const product = await updateAProduct(productSold);
    console.log(product);
    if (!product) return res.status(404).json({ message: 'Product Not Found' });
    const { _id, quantity, name } = product;
    if (quantity < 0) return res.status(404).json(STOCK_PROBLEM_OBJECT); 
    
    updateById(_id, name, quantity); 
} catch (err) {
      console.log(err);
    }
  });

  next();
};

module.exports = {
  updateProductsWhenSale,
};