// npm install node-fetch

/*
    status do código: sucesso. 

    só não entendi a linha 18 do método fetch 
        .then(res => res.json())
*/


const fetch = require('node-fetch');

let url = "http://api.openweathermap.org/data/2.5/weather?q=porto+alegre&units=metric&APPID=5bbd9b3543a43bc4d4cb7fc640a7bf67&lang=pt_br";

let settings = { method: "Get" };

fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
        console.log(`O tempo em Porto Alegre é ${json.weather[0].description}.`);
        console.log(`A temperatura atual é de ${json['main']['temp']} °C.`);
        console.log(`E a sensação é de ${json['main']['feels_like']} °C.`);
    });
