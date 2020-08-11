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
    console.log(`\nDados do país.`)
    console.log(`\nInfectados: ${infectados}`)
    console.log(`Recuperados: ${recuperados}`)
    console.log(`Falecidos: ${falecidos}`)
    console.log(`Enfermos: ${aindaEnfermos}`)
    
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
    console.log(`\nDados do estado.`)
    console.log(`Infectados: ${infectadosNoEstado}`)
    console.log(`Falecidos: ${falecidosNoEstado}`)
});