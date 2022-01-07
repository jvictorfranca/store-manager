const express = require('express');
const { 
  createProductController,
  findAllProductsController,
  findProductByIdController,
  } = require('./controllers/products.controller');

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

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
