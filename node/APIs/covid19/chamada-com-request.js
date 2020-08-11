/*
    status do codigo: chamada de API e formatação dos dados nacionais e estaduais 100% sucedida. 
    Por enquanto foi o script mais robusto que já fiz (sozinho - não seguindo uma documentação ou curso), 
    com o maior número de métodos diferentes utilizados, e sem muita dificuldade de saber quais os próximos 
    passos para trazer a informação da maneira correta.
    2020-06-20 21:28:43

    o que pode melhorar neste código: nomes de variáveis menores.
    LITERALMENTE tem uma variável chamada ''porcentagemPopulacaoEstadualFalecida''  🤷‍♂️
    da linha 65 - 76 foi a parte mais confusa para eu fazer, porque me embolei com o nome das variáveis.

    futuras implementações:
    1. dá para receber input do usuário no terminal para que a busca por estado seja dinâmica, não só trazendo dados do RS.
    2. fazer uma versão de retorno apenas dos valores chaves para monitoramento (para quando eu conseguir chamar esse método Request abaixo e repetí-lo algumas vezes), e conseguir comparar semana a semana.
    
    questionamentos:
    me pergunto se todas essas conversões de valores precisariam ficar dentro da função deste request, 
    ou se eu poderia organizar, compartimentando estas partes que não logam texto no terminal em documentos diferentes.
*/

var request = require('request');

request('https://api.apify.com/v2/key-value-stores/TyToNta7jGKkpszMZ/records/LATEST?disableRedirect=true', function (error, response, body) {
    var json = JSON.parse(body);
    let calculoAindaEnfermos = json.infected - (json.deceased + json.recovered)


    // porcentagens
    let porcentagemRecuperados = (json.recovered / json.infected) * 100
    let porcentagemFalecidos = (json.deceased / json.infected) * 100
    let porcentagemAindaEnfermos = (calculoAindaEnfermos / json.infected) * 100
    let porcentagemPopulacaoNacionalInfectada = (json.infected / 209000000) * 100 // verificado no google em 2020-06-20 20:27:45
    
    
    // separando valores a cada 3 dígitos
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    } // claro que não fui eu que criei essa regular expression, adaptei do que achei na web.
    
    
    let infectados = formatNumber(json.infected)
    let recuperados = formatNumber(json.recovered)
    let falecidos = formatNumber(json.deceased)
    let aindaEnfermos = formatNumber(calculoAindaEnfermos)
    
    
    // em todo o Brasil
    console.log(`\nDesde o começo de março até agora, em todo o Brasil, tivemos ${infectados} casos de Covid-19. \nIsto representa ${porcentagemPopulacaoNacionalInfectada.toFixed(1)}% de toda a população do país, uma vez que temos 209 milhões hoje.\n`)
    console.log(`${recuperados} pessoas se recuperaram (${porcentagemRecuperados.toFixed(1)}%).`)
    console.log(`${falecidos} faleceram (${porcentagemFalecidos.toFixed(1)}%).`)
    console.log(`${aindaEnfermos} ainda permanecem doentes pelo vírus (${porcentagemAindaEnfermos.toFixed(1)}%).\n`)
    
    // esta parte é para adquirir e processar o numero de INFECTADOS no RS.
    // futuramente posso implementar para que busque de qualquer outro estado solicitado.
    let jsonInfec = json.infectedByRegion
    
    var localizarInfecPorEstado = jsonInfec.find(function(item, index) {
        if(item.state == 'RS')
        return true;
    });
        // On success localizarInfecPorEstado will contain the complete element (an object)
        // On failure it will contain undefined
    
    let estado = localizarInfecPorEstado.state
    let infectadosNoEstado = formatNumber(localizarInfecPorEstado.count)
    let porcentagemPopulacaoEstadualInfectada = (localizarInfecPorEstado.count / 1500000) * 100 // verificado no google em 2020-06-20 20:27:45


    // esta parte é para adquirir e processar o número de FALECIDOS no RS.
    let jsonFalec = json.deceasedByRegion
    
    var localizarFalecPorEstado = jsonFalec.find(function(item, index) {
        if(item.state == 'RS')
        return true;
    });
        // On success localizarFalecPorEstado will contain the complete element (an object)
        // On failure it will contain undefined
    
    let falecidosNoEstado = formatNumber(localizarFalecPorEstado.count)
    let porcentagemPopulacaoEstadualFalecida = (localizarFalecPorEstado.count / localizarInfecPorEstado.count) * 100


    // no RS
    console.log(`No estado do ${estado}, temos ${infectadosNoEstado} casos de Covid-19. \nIsto representa ${porcentagemPopulacaoEstadualInfectada.toFixed(1)}% de toda a população do estado, uma vez que temos 1,5 milhões hoje.`)
    console.log(`E ${falecidosNoEstado} faleceram (${porcentagemPopulacaoEstadualFalecida.toFixed(1)}%).`)
    console.log(`Não temos dados estaduais de quantos se recuperaram ou permanecem doentes.\n`)
});