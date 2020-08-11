const puppeteer = require('puppeteer')

const openPage = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.youtube.com/watch?v=JxgGhnzE5sw')

    const getInfo1 = await page.evaluate(() => {
        return {
            title: document.title
        }
})

await page.goto('https://www.youtube.com/watch?v=o2aMo2JMaEI&list=PL6tu16kXT9Pp4nyF6XrHIB79ezFmyZVUA')

    const getInfo2 = await page.evaluate(() => {
        return {
            title: document.title
        }
})


console.log(getInfo1, getInfo2)
await browser.close()
}
openPage()