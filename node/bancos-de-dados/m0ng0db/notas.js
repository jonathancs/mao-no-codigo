/*
    anotações de pontos interessantes que fui solidificando ao assistir pela 2ª vez este tutorial inicial de node e express.

    https://www.youtube.com/watch?v=WTOnKNjiPWU&list=PLpcSpRrAaOaoIqHQddZOdbRrzr5dJtgSs&index=12

    inicialente, dá para utilizar a funcionalidade HTTP do Node para criar um webserver. No entanto, há uma solução já criada especificamente para criar webservers: o express.

    "Express é um monte de código Javascript pré-escrito para o ambiente Node que podemos manejar. Express toma conta de mil detalhes para nós, para que possamos evitar de ter que inventar a roda e manter nosso código organizado." - Brad Schiff
*/

/*
    entao, utilizando express para subir um servidor, precisamos do seguinte:
*/

let express = require("express")
let ourApp = express()

ourApp.get('/', function () {
    res.send('uma pagina que exibe um conteúdo')
} )

ourApp.listen(3000)

ourApp.get('/', function () {
  res.send('alguma coisa')  
})

ourApp.set('views', 'views')
ourApp.set('view engine', 'ejs')

/*
    o primeiro 'views' é o que queremos configurar, é o método views, e o segundo 'views' é o nome da pasta onde estarão os templates do front que vamos renderizar com as chamadas que forem recebidas.

    com o 'view engine' estamos configurando qual engine vamos escolher para renderizar os templates. que nesse caso é a engine ejs.
*/

/*
    Ao que eu entendi, por mais simples que se queira fazer um CRUD do zero, (no modelo MVC), precisa-se ter os arquivos

        app.js - subir servidor, redirecionar chamadas Get.
        views - vai receber o a info e enviar pro app.
        model - pegar a info do front, modelar ela e cadastrar no banco.
*/