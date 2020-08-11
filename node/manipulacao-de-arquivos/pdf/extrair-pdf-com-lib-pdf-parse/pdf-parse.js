/*
    status do codigo: sem sucesso ao chamar metodos do javascript no valor que o pdf-parse retorna.
    tentei aplicar metodos a variavel ''data'' que o pdf-parse retorna, sem sucesso.
    2020-06-24 23:52:51
*/

/*
    npm i pdf-parse
*/


const fs = require('fs') // modulo para acessar os arquivos do sistema; FS: file system
const pdfparse = require('pdf-parse')

const pdffile = fs.readFileSync('myLinkedinResume.pdf') //path do arquivo

// get the information from pdf

pdfparse(pdffile).then(function (data) {  // é uma promessa que contem uma callback function....?
    // console.log(data.numpages) // numero de paginas

    // console.log(data.info) // informaçoes sobre o arquivo em si

    // console.log(data.text) // extrai todo o texto do arquivo 

    // let dataSearch = data.search("recruiter") 
    // esse codigo não funcionou, suspeito que é porque ''data'' não é uma string.
    
    //let dataString = data.toString() // tentei converter ''data'' pra uma string
    //console.log(dataString.search("Jonathan")) // e retornou -1

})