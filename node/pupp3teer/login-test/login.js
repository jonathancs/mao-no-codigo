/**
 * efeito do codigo: logar no facebook.
 * status do codigo: funcionou perfeitamente.
 * configuracao adicional: inserir seu email e senha no arquivo "CONFIG.JSON"  , dai eh so rodar com node.
 */

const puppeteer = require('puppeteer')
const fs = require('fs')
const config = require('./config.json')
const cookies = require('./cookies.json')

async function loginFacebook() {
	// start up puppeteer and create a new page
	let browser = await puppeteer.launch({ headless: false })
	let page = await browser.newPage()

	// Check if we have a previously saved session
	if (Object.keys(cookies).length) {
		// set the saved cookies in the puppeteer browser page
		await page.setCookie(...cookies)

		// go to facebook
		await page.goto('https://www.facebook.com/', {
			waitUntil: 'networkidle2',
		})
	} else {
		// go to facebook login page
		await page.goto('https://www.facebook.com/login/', {
			waitUntil: 'networkidle0',
		})

		// write username and password
		await page.type('#email', config.username, { delay: 30 })
		await page.type('#pass', config.password, { delay: 30 })

		// click login button
		await page.click('#loginbutton')

		// wait for navigation to finish
		await page.waitForNavigation({ waitUntil: 'networkidle0' })
		await page.waitFor(5000)

		//  check if logged in
		await page.screenshot({ path: 'facebook.png' })

		await browser.close()
	}
}

loginFacebook()
