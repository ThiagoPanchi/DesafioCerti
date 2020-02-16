const unidades = require('../utils/unidades');
const uniDez = require('../utils/uniDez');
const dezenas = require('../utils/dezenas');
const centenas = require('../utils/centenas');




module.exports =  {

  async  transform(res, num) {

    let vlr = num;
    let vlrStr = String(vlr);
    let vlrLeng = vlrStr.length;
    let vlrSign = Math.sign(vlr);
    let vlrPos = vlr*-1;
    //let mil = 'mil';
    let neg = 'menos';

    if(vlrLeng == 1) {
          
      let ext = unidades[vlr];
      return res.json({ extenso: ext });
      
    }

    if(vlrLeng == 2) {

      if(vlrSign == -1) {

        let ext = neg+' '+unidades[vlrPos];
        return res.json({ extenso: ext });

      } else {

        if(vlr <20) {

          let ext = uniDez[vlr-10];
          return res.json({ extenso: ext });

        } else {
          
          let vlrSplit = vlr.split("");
          
          if(vlrSplit[1] == 0) {
            
            return res.json({ extenso: dezenas[vlrSplit[0]] });
            
          } else {
            
            return res.json({ extenso: dezenas[vlrSplit[0]]+' e '+unidades[vlrSplit[1]] });
            
          }
        }
      }
    } 
  }
}