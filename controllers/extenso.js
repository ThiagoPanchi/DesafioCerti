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
    let extensoArr = [];

    function umAlg() {
      let umExt = unidades[vlr];
      extensoArr.push(umExt);
      //return res.json({ extenso: ext });
    } 

    function doisAlg() {
      if(vlrSign == -1) {

        let negExt = neg+' '+unidades[vlrPos];
        extensoArr.push(negExt);
        //return res.json({ extenso: ext });

      } else {

        if(vlr <20) {

          let dezExt = uniDez[vlr-10];
          extensoArr.push(dezExt);
          //return res.json({ extenso: ext });

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

    function tresAlg() {

    }

    if(vlrLeng == 1) {

      umAlg();
      return res.json({ extenso: extensoArr[0]});

    }

    if(vlrLeng == 2) {

      doisAlg();
      return res.json({ extenso: extensoArr[0]})
    } 

    if (vlrLeng == 3) {

    }
  }
}