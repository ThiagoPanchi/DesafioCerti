const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
  
  res.statusCode = 200;
  res.setHeader('content-type', 'text/html');
  res.end('<h1> Desafio Certi</h1> <p> Insira o numero após htttp://localhost:3000/ na barra de endereço.</p> <p>Ex: http://localhost:3000/10 </p> ');
});

app.get('/:num', (req, res) =>{
  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');
  res.json({ num: req.params.num });
});

app.listen(3000, () =>{
  console.log('Servidor rodando!');
});