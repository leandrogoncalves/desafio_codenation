const axios = require('axios');
const BASE_URL = 'https://api.codenation.dev';
const Database = require('./database');
const Decripty = require('./decrypt');
const crypto = require('crypto');
require('dotenv').config();

(async ()=>{
    
    try{
        let responseJson = null;
        
        const token = process.env.TOKEN;
        
        if (token) {
            
            await axios.get(BASE_URL + '/v1/challenge/dev-ps/generate-data',{
                params: {
                    token: token
                }
            }).then(response => {
                responseJson = response.data;
            }).catch((error) => {
                console.log(error);
            });
            
            if (await Database.escreverArquivo(responseJson)) {
                console.log('1 - Arquivo escrito com sucesso');
            }
            
        }
        
        let jsonData = await Database.obterArquivo();
        
        jsonData.decifrado = (new Decripty(jsonData)).getDecripted();
        if (jsonData.decifrado) {
            console.log('2 - Texto decifrado com sucesso');
        }
        
        jsonData.resumo_criptografico = crypto.createHash('sha1').update(jsonData.decifrado).digest('hex');
        
        if( await Database.escreverArquivo(jsonData) ){
            console.log('3 - Arquivo atualizado com sucesso');
        }
        
        console.log(jsonData);

    }catch(error){
        console.error(error);
        
    }
    
    
})();