const express = require('express');
const bodyParser = require('body-parser');
const unidades = require('./utils/unidades');
const uniDez = require('./utils/uniDez');
const dezenas = require('./utils/dezenas');
const centenas = require('./utils/centenas');


let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
  
  res.statusCode = 200;
  res.setHeader('content-type', 'text/html');
  res.end('<h1> Desafio Certi</h1> <p> Insira o numero após htttp://localhost:3000/ na barra de endereço.</p> <p>Ex: http://localhost:3000/10 </p> ');
});

app.get('/:num', (req, res) =>{

  let vlr = req.params.num;
  let vlrStr = String(vlr);
  let vlrLeng = vlrStr.length;
  let vlrSign = Math.sign(vlr);
  let vlrPos = vlr*-1;
  //let mil = 'mil';
  let neg = 'menos';

  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');

  if(vlrLeng == 1) {
        
    let ext = unidades[vlr];
    res.json({ extenso: ext });
    
  }

  if(vlrLeng == 2) {

    if(vlrSign == -1) {

      let ext = neg+' '+unidades[vlrPos];
      res.json({ extenso: ext });

    } else {

      if(vlr <20) {

        let ext = uniDez[vlr-10];
        res.json({ extenso: ext });

      } else {
        
        let vlrSplit = vlr.split("");
        
        if(vlrSplit[1] == 0) {
          
          res.json({ extenso: dezenas[vlrSplit[0]] });
          
        } else {
          
          res.json({ extenso: dezenas[vlrSplit[0]]+' e '+unidades[vlrSplit[1]] });
          
        }
      }
    }
  } 


//  res.statusCode = 200;
//  res.setHeader('content-type', 'application/json');
//  res.json({ extenso: vlr });
});

app.listen(3000, () =>{
  console.log('Servidor rodando!');
});