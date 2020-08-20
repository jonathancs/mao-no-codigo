const fs = require('fs')

const dir = 'C:/Users/Administrador/Downloads'
const files = fs.readdirSync(dir)


for (let i = 0; i < files.length; i++) {
  const element = files[i];
  fs.appendFileSync("arquivoNovo.txt", `${element}\n`)
}