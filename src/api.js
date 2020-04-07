const axios = require('axios');
const FormData = require('form-data');
const Database = require('./database');
require('dotenv').config();
const TOKEN = process.env.TOKEN;
const BASE_URL = process.env.BASE_URL;
const GET_URL = process.env.GET_URL;
const POST_URL = process.env.POST_URL;

const api = {

    obterDados: async function(){
        let responseJson;

        await axios.get(BASE_URL + GET_URL,{
            params: {
                token: TOKEN
            }
        }).then(response => {
            responseJson = response.data;
        }).catch((error) => {
            console.log(error);
            return false;
        });
    
        return responseJson;
    },

    enviaArquivo: async function(){
        
        let output = false;
        let file = Database.obterUploadStream();
        
        const formData = new FormData();
        formData.append('answer',file);

        await axios.post(BASE_URL + POST_URL, formData, {
            params: {
                token: TOKEN
            },
            headers: formData.getHeaders()
        
        }).then(response => {
            output = response.data;
        }).catch((error) => {
            console.error(error.response.headers);
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.request._header);
            console.error(error);
        });
    
        return output;
    }
};


module.exports = api;
