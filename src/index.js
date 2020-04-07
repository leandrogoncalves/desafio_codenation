const Database = require('./database');
const Decripty = require('./decrypt');
const Api = require('./api');
const Crypto = require('crypto');
require('dotenv').config();

(async ()=>{
    
    try{
        let responseJson = null;
        
        const token = process.env.TOKEN;
        
        if (token) {
            
            responseJson = await Api.obterDados();

            if (await Database.escreverArquivo(responseJson)) {
                console.log('1 - Arquivo escrito com sucesso');
            }
            
        }
        
        let jsonData = await Database.obterArquivo();
        
        jsonData.decifrado = (new Decripty(jsonData)).getDecripted();
        if (jsonData.decifrado) {
            console.log('2 - Texto decifrado com sucesso');
        }
        
        jsonData.resumo_criptografico = Crypto.createHash('sha1').update(jsonData.decifrado).digest('hex');
        
        if( await Database.escreverArquivo(jsonData) ){
            console.log('3 - Arquivo atualizado com sucesso');
        }
        
        const response = await Api.enviaArquivo();
        if ( response ) {
            console.log('4 - Arquivo enviado com sucesso, score: ' +response.score);
        }

    }catch(error){
        console.error(error);
    }
    
    
})();