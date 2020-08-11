// status do código: funcionou, mas precisa ser aperfeicoado.

const puppeteer = require('puppeteer')

const openPage = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.youtube.com/watch?v=JxgGhnzE5sw')

    const getInfo = await page.evaluate(() => {
        return {
            title: document.body.innerText
        }
})

    console.log(getInfo)
    await browser.close()
}
openPage()