let express = require('express')
let app = express()
const Pedido = require('./models/Pedido')

app.use(express.urlencoded({extended: false})) 
// tells express to add the user submitted data to the request object.
// so we can access it from request.body

app.use(express.json())
/*
    com a linha 7 e a 11, estamos configurando nossa aplicação para receber os
    dois tipos mais comuns de envio de dados na web: um submit do HTML (linha 7)
    e json (linha 11).
*/

app.set('view engine', 'ejs')
app.set('views', 'views')
// npm install ejs

app.get('/', (req, res) => {
    res.render('form')
})

app.post('/pedido1', function (req, res) {
    let pedido = new Pedido(req.body)
    pedido.register()
    if (pedido.errors.length) {
        res.send(pedido.errors)
    } else {
        res.send("Pedido enviado. (não foram encontrados erros)")
    }
})

module.exports = app


/*

*/