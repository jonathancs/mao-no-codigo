const pedidosCollection = require('../db').collection("filaDePedidos")
const validator = require('validator')

let Pedido = function (data) {
    this.dadosDoForm = data 
    this.errors = []
    /* 
        ""this.data = data""
        estamos pegando os dados que recém foram passados via 
        parâmetro (lá do front, imagino eu) e armazenando ele dentro de uma 
        propriedade, para podermos acessar depois.

        "se não armazenassemos esses dados do fomulário, eles iriam 
         sumir assim que a função terminasse a execução."
    */
}

Pedido.prototype.cleanUp = function () {
    if (typeof(this.dadosDoForm.formPedido) != "string") {this.dadosDoForm.formPedido = ""}
        // se lá no front, o usuário de alguma forma maliciosa nos enviou dados que NÃO SÃO uma string
        // daí vamos automaticamente transforma-la para vazio, e aí vai retornar a 1ª validação ali logo abaixo.

    
    // aqui é para se livrar de qualquer propriedade indesejada que o usuário enviou de forma maliciosa junto com a string.
    this.data = {
        formPedido: this.dadosDoForm.formPedido
    }
}

Pedido.prototype.validate = function () {
    if (this.dadosDoForm.formPedido == "") {this.errors.push("você deve inserir um pedido.")}
    if (this.dadosDoForm.formPedido != "" && !validator.matches(this.dadosDoForm.formPedido, (/^[a-zA-Z0-9 áâãéêóôõíúçäöü.,]*$/gm))) {this.errors.push('Seu pedido só deve conter letras, números e espaços. Caracteres como () {} `` ´´, aspas simples e aspas duplas. Tente remover estes caracteres do pedido e tente novamente. Contate o suporte da empresa se continuar tendo problemas.')}
    
    /* 
        a documentação do validator menciona como utilizar o método matches:
        matches(str, pattern [, modifiers])
    */
    
    if (this.dadosDoForm.formPedido.length > 0 && this.dadosDoForm.formPedido.length < 3 ) {this.errors.push("nome do pedido muito curto para processarmos.")}
    if (this.dadosDoForm.formPedido.length > 100 ) {this.errors.push("Nome do pedido muito longo, máximo de 100 caracteres. Tente abreviar o texto, ou dividir em 2 pedidos. Se continuar enfrentando dificuldades, contate sua gestão e a área de suporte da empresa.")}
}

Pedido.prototype.register = function () {
    // validar dados do pedido.
    this.cleanUp()
    this.validate()


    // SE não houver erros de validação, inserir dados no banco de dados.
    if (!this.errors.length) {
        pedidosCollection.insertOne(this.dadosDoForm)
    }
}

module.exports = Pedido