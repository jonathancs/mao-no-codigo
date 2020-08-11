// status do código: funcionou.
// por algum motivo só ele não encerrou a chamada, mesmo com o browser.close

const puppeteer = require('puppeteer')

const tirarPrint = async (url1) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url1)
    await page.screenshot({path: 'youtube.png'})
    browser.close()
}

tirarPrint('https://www.youtube.com/watch?v=8x1svKFbdU0&t=1412s')