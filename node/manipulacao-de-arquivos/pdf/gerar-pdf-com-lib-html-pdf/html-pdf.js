/*
    status do codigo: geracao de pdf com node com a biblioteca html-pdf sucedida.

    seguindo este vídeo.
    https://youtu.be/RFtZctuI_1Y

    no vídeo, ele comentou que poderia deixar o html em um arquivo separado, NO ENTANTO, não conseguiria continuar 
    empregando campos dinamicos. Me pergunto se com a biblioteca ejs ou com <%= %> nao daria tambem. vou testar em outro momento.
    
    e pra minha surpresa ele acabou de comentar que a biblioteca html-pdf atua com view engines, 
    que nos permite escrever html dinamico (com variaveis).
    Adivinha se ele não acabou de falar na engine ejs 🤦‍♂️
    com código javascript entre  <% %>   kkkk
*/

const pdf = require("html-pdf") // npm install html-pdf
const ejs = require("ejs") // npm install ejs

let nomeDoUsuario = "john"
let curso = "curso de node"

ejs.renderFile("./view-html.ejs", {nome: nomeDoUsuario, curso: curso}, (err, html) => {
    if (err) {
        console.log("erro")
    } else {
        
        pdf.create(html, {}).toFile("./pdfGerado.pdf", (err, res) => {
            if (err) {
                console.log("ocorreu um erro")
            } else {
                console.log("success")
            }
        })
    }
})