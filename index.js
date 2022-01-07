const express = require('express');
const { createProductController } = require('./controllers/products.controller');

const PORT = 3000;

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// app.get('/users', listUsers);
app.post('/products', createProductController);

app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`));
