// status do código: funcionou, mas precisa ser aperfeicoado.

// inspirado por: https://www.youtube.com/watch?v=TzZ3YOUhCxo

/* detalhe: 
no momento que acessei a pagina PUBLICA do meu perfil do linkedin (pelo navegador anonimo) 
para pegar o XPath dos campos a serem scrapados, a página já retornou um Captcha para verificar que era humano. QUE M!!!!!!!!! malditos
2020-06-03 19:07:02

o XPath que disponibilizam no DevTools do navegador nem retorna um endereço útil. 
Vou tentar o XPath logado com meu usuário. Dai mais tarde vejo como automatizar para logar meu usuario e senha rsrs.
2020-06-03 19:18:58
*/

const puppeteer = require('puppeteer')

async function scrapPage (url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const getInfo = await page.evaluate(() => {
        return {
            title: document.body.innerText.match(/unreal/ig)
        }
})
    console.log(getInfo);
    await browser.close();
}

let url = 'https://www.youtube.com/watch?v=7MSFW8pZ-_4'
scrapPage(url)
