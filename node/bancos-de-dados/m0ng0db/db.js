// npm i mongodb

const mongodb = require('mongodb')

const connectionString = 'mongodb+srv://TodoApp:qwerqwer1!@cluster3-dhq2r.mongodb.net/Pedidos?retryWrites=true&w=majority'
                                                                       /* mongodb.net/NOME-DO-BANCO-DE-DADOS-QUE-VAI-SER-USADO?retryWrites=true
*/

mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
    module.exports = client.db()
    const app = require('./app')
    app.listen(3000)

    /* 
        CLIENT é um parâmetro, dentro dele tem o método db()
        esse método vai retornar o banco de dados que 
        vamos estar trabalhando. Daí em diante podemos
        chamar a collection e realizar CRUD.

        com o MODULE.EXPORTS, se requisitarmos db.js de outro arquivo,
        vai nos retornar este banco de dados para seguirmos trabalhando.

        um cuidado nesta parte: 
        não podemos iniciar o servidor de pedidos antes de o 
        banco de dados ter estabelecido a conexão com nosso 
        sistema. Por isso, ao iniciar nossa aplicação node, 
        não vamos começar com o app.js, e sim com db.js ,
        pelo motivo de ser uma conexão asincrona.
        a conexão com o banco de dados pode levar 5ms, ou 5000ms.
    */
})