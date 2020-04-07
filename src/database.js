const { writeFile, readFile, createReadStream } = require('fs');
const { promisify } = require('util');
const [writeFileAsync, readFileAsync] = [
    promisify(writeFile),
    promisify(readFile),
];

class Database {
    constructor() {
        this.FILENAME = 'answer.json';
    }
    
    async escreverArquivo(dados) {
        await writeFileAsync(this.FILENAME, JSON.stringify(dados));
        return true;
    }
    
    async obterArquivo(string = true) {
        const arquivo = await readFileAsync(this.FILENAME);
        return JSON.parse(arquivo.toString());
    }
    
    obterUploadStream() {
        return createReadStream(this.FILENAME);
    }
}

module.exports = new Database();