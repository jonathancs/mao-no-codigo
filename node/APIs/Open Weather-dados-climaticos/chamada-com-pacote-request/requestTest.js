/*
  informações que também constam no readme da pasta:

  trata-se de uma API que retorna um Json com dados climáticos de 90% das regioes do mundo.
  
  encontrei a documentação na 1ª pagina de resultados do google.

  https://medium.com/trainingcenter/brincando-com-uma-api-simples-em-node-js-8c1a50c7aab3

  a documentação orienta como utilizar o pacote Request, já descontinuado desde fev/2020.

*/



var request = require('request');
// npm install request

request('http://api.openweathermap.org/data/2.5/weather?q=porto+alegre&units=metric&APPID=5bbd9b3543a43bc4d4cb7fc640a7bf67&lang=pt_br', function (error, response, body) {
    //console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  var parsedWeather = JSON.parse(body);
  console.log(`o tempo em Porto Alegre está ${parsedWeather.weather[0].description}.`);
  
  /*
  descobri porque este comando estava retornando undefined, porque a propriedade weather retorna o seguinte:
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "nublado",
      "icon": "04n"
    }
  ],
  
  e tem um maldito [] envolvendo o objeto que eu tava tentando acessar. O motivo: porque as vezes o clima tem 2 características com os mesmos nomes de propriedade, e daí precisa especificar qual das duas que estamos chamando, por isso o [0] neste caso.
  2020-06-18 21:27:15
  
  eu só não entendi porque nos comandos abaixo, o uso de [] para acessar as propriedades funciona, porém, se tentar acessar algum index dentro do objeto como este, não rola. tem que ir utilizando o  .  como na linha 23.
  
      console.log(`o tempo em Porto Alegre está ${parsedWeather['weather']['description']}`);
  */
  
  console.log(`A temperatura atual é de ${parsedWeather['main']['temp']} °C.`);
  console.log(`E a sensação é de ${parsedWeather['main']['feels_like']} °C.`);
});