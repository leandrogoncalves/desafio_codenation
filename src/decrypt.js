const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const alphabetNegative = {"u":-6,"v":-5,"w":-4,"x":-3,"y":-2,"z":-1};

class Decripty {

    constructor(input){
        this.data = input.cifrado;
        this.factor = parseInt(input.numero_casas);
        return this;
    }

    getDecripted(){
        let textDecripted = '';

        for (let i = 0; i < this.data.length; i++) {
            let letter = this.data[i];

            const index = alphabet.findIndex((alpha)=>{
                return alpha === letter;
            });

            if (index === -1) {
                textDecripted += letter;
                continue;
            }

            textDecripted += this.getNewLetter(index);

        }
        
        return textDecripted;
    }

    getNewLetter(index){
        let newIndex;

        newIndex = index - this.factor;

        if (newIndex < 0) {
            for (const key in alphabetNegative) {
                if(alphabetNegative[key] == newIndex){
                    return key;
                }
            }
        }

        return alphabet[newIndex];
    }
}

module.exports = Decripty;