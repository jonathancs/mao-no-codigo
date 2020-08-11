/*
    status do código: funcionou. só faltou o csv já vir com as colunas separadas.
*/


const fs = require('fs')  // require file systems

const csv = require('fast-csv')

const ws = fs.createWriteStream('csvExemplo.csv') // sem especificação, cria na pasta local, mas acredito que dê para configurar o destino.

csv.
    write([

        ["a1","b1"], // row by row
        ["b2","c2"],
        ["c2","d2"]
    ], {headers:true})
    .pipe(ws)