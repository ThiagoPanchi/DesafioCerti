const unidades = require('../utils/unidades');
const uniDez = require('../utils/uniDez');
const dezenas = require('../utils/dezenas');
const centenas = require('../utils/centenas');




module.exports =  {

  async  transform(res, num) {

    let vlr = await num;
    let vlrStr = await String(vlr);
    let vlrLeng = await vlrStr.length;
    let vlrSign = await Math.sign(vlr);
    let vlrPos = await vlr*-1;
    let mil = 'mil';
    let neg = await 'menos';
    let extensoArr = await [];

    function negAlg(callback) {
      
      vlr = vlrPos;
      vlrSign = 1;

      if (vlrLeng == 2){
        
        extensoArr.push(neg+' '+unidades[vlrPos]);
        
      }
      if (vlrLeng == 3){
        doisAlg();
        let negExt = neg+' '+extensoArr;
        extensoArr.pop(0);
        extensoArr.push(negExt);
      }

      if (vlrLeng == 4){
        tresAlg();
        let negExt = neg+' '+extensoArr;
        extensoArr.pop(extensoArr);
        extensoArr.push(negExt);
      }

      if (vlrLeng == 5){
        quatroAlg();
        let negExt = neg+' '+extensoArr;
        extensoArr.pop(extensoArr);
        extensoArr.push(negExt);
      }

      if (vlrLeng == 6){
        cincoAlg();
        let negExt = neg+' '+extensoArr;
        extensoArr.pop(extensoArr);
        extensoArr.push(negExt);
      }

    }

    function umAlg() {
      let umExt = unidades[vlr];
      extensoArr.push(umExt);
      
    } 

    function doisAlg() {
      if(vlrSign == -1) {

        negAlg();

      } else {

        if(vlr <20) {

          let dezExt = uniDez[vlr-10];
          extensoArr.push(dezExt);
          
        } else {
          
          let vlrSplit = vlr.toString().split("");
          
          if(vlrSplit[1] == 0) {
            
            extensoArr.push(dezenas[vlrSplit[0]]);
            
          } else {
            
            let doisExt = dezenas[vlrSplit[0]]+' e '+unidades[vlrSplit[1]];
            extensoArr.push(doisExt);
            
          }
        }
      }
    }

    function tresAlg() {
      if (vlrSign == -1){
        negAlg();
      } else {
        if (vlr == 100) {
          extensoArr.push('cem');
        }

        let vlrSplit = vlr.toString().split("");

        if (vlrSplit[1] == 0 && vlrSplit[2] == 0) {

          extensoArr.push(centenas[vlrSplit[0]]);
        } else if (vlrSplit[2] == 0) {
          
          extensoArr.push(centenas[vlrSplit[0]]+' e '+dezenas[vlrSplit[1]]);
        } else if (vlrSplit[1] == 0) {

          extensoArr.push(centenas[vlrSplit[0]]+' e '+unidades[vlrSplit[2]])
        } else {
          
          extensoArr.push(centenas[vlrSplit[0]]+' e '+dezenas[vlrSplit[1]]+' e '+unidades[vlrSplit[2]]);      
        }
      }
    }

    function quatroAlg() {
      let vlrSplit = vlr.toString().split("");
      if (vlrSign == -1) {
        negAlg();
      } else {
        if (vlr == 1000) {
          extensoArr.push(mil);
        } else if(vlrSplit[1] == 1 && vlrSplit[2] == 0 && vlrSplit[3] == 0) {
          extensoArr.push(unidades[vlrSplit[0]]+' '+mil+' e cem');
        } else if(vlrSplit[2] == 0 && vlrSplit[3] == 0) {
          extensoArr.push(unidades[vlrSplit[0]]+' '+mil+' e '+centenas[vlrSplit[1]]);
        } else {
          
          vlr = vlrSplit[1]+vlrSplit[2]+vlrSplit[3];
          tresAlg();
          let quatAlg = unidades[vlrSplit[0]]+' '+mil+' '+extensoArr;
          extensoArr.pop(extensoArr);
          extensoArr.push(quatAlg);
        }
      }
    }

    function cincoAlg(){
      let vlrSplit = vlr.toString().split("");
      
      if (vlrSign == -1) {
        negAlg();
      } else {
        if (vlrSplit[1] == 0 && vlrSplit[2] == 0 && vlrSplit[3] == 0 && vlrSplit[4] == 0){
          extensoArr.push(dezenas[vlrSplit[0]] +' '+ mil);
        } else if(vlrSplit[2] == 0 && vlrSplit[3] == 0 && vlrSplit[4] == 0){
          extensoArr.push(dezenas[vlrSplit[0]] +' e '+unidades[vlrSplit[1]]+' '+ mil);
        } else if(vlrSplit[2] == 1 && vlrSplit[3] == 0 && vlrSplit[4] == 0){
          extensoArr.push(dezenas[vlrSplit[0]] +' e '+unidades[vlrSplit[1]]+' '+ mil+' e cem');
        } else if (vlrSplit[1] == 0){
          vlr = vlrSplit[2]+vlrSplit[3]+vlrSplit[4];
        
          tresAlg();
        
          let cincAlg = dezenas[vlrSplit[0]]+' '+mil+' e '+extensoArr;
          extensoArr.pop(extensoArr);
          extensoArr.push(cincAlg);
        } else {

        vlr = vlrSplit[2]+vlrSplit[3]+vlrSplit[4];
        
        tresAlg();
        
        let cincAlg = dezenas[vlrSplit[0]]+' e '+ unidades[vlrSplit[1]]+' '+mil+' e '+extensoArr;
        extensoArr.pop(extensoArr);
        extensoArr.push(cincAlg);
        }
      }
    }

    function seisAlg() {
      if (vlrSign == -1) {
        negAlg();
      } else {
        extensoArr.push('Valor fora do intervalo de -99999 e 99999 (menos noventa e nove mil novecentos e noventa e nove e noventa e nove mil novecentos e noventa e nove)');
      }
    }


    if(vlrLeng == 1) {

      umAlg();
      return res.json({ extenso: extensoArr[0]});

    }

    if(vlrLeng == 2) {

      doisAlg();
      return res.json({ extenso: extensoArr[0]});
    } 

    if (vlrLeng == 3) {
      tresAlg();
      return res.json({ extenso: extensoArr[0]});
    }
    if (vlrLeng == 4) {
      quatroAlg();
      return res.json({ extenso: extensoArr[0]});
    }
    if (vlrLeng == 5) {
      cincoAlg();
      return res.json({ extenso: extensoArr[0]});
    }
    if (vlrLeng == 6) {
      seisAlg();
      return res.json({ extenso: extensoArr[0]});
    }
    if (vlrLeng > 6) {
      return res.json({ extenso: 'Valor fora do intervalo de -99999 e 99999 (menos noventa e nove mil novecentos e noventa e nove e noventa e nove mil novecentos e noventa e nove)' });
    }
  }
}