const express = require('express');
const { 
  createProductController,
  findAllProductsController,
  findProductByIdController,
  updateProductByIdController,
  deleteProductByIdController,
  } = require('./controllers/products.controller');
const {
  createSaleController,
  findAllSalesController,
  findSaleByIdController,
  updateSaleByIdController,
  deleteSaletByIdController, 
} = require('./controllers/sales.controller');

const PORT = 3000;

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// app.get('/users', listUsers);
app.get('/products', findAllProductsController);
app.get('/products/:id', findProductByIdController);
app.post('/products', createProductController);
app.put('/products/:id', updateProductByIdController);
app.delete('/products/:id', deleteProductByIdController);

app.get('/sales', findAllSalesController);
app.get('/sales/:id', findSaleByIdController);
app.post('/sales', createSaleController);
app.put('/sales/:id', updateSaleByIdController);
app.delete('/sales/:id', deleteSaletByIdController);

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
