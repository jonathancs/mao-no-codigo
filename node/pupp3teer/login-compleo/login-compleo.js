/**
 * objetivo do codigo: me ajudar em tarefas repetitivas e demoradas do RH
 * status do codigo: login com sucesso.
 *
 */

const puppeteer = require('puppeteer')
const fs = require('fs')
const config = require('./config.json')
const cookies = require('./cookies.json')
const { type } = require('os')

async function loginCompleo() {
	// Start Up Puppeteer And Create A New Page
	let browser = await puppeteer.launch({ headless: false })
	let page = await browser.newPage()

	// Check If We Have A Previously Saved Session
	if (Object.keys(cookies).length) {
		// Set The Saved Cookies In The Puppeteer Browser Page
		await page.setCookie(...cookies)

		// Go To Compleo
		await page.goto('https://ats.compleo.com.br/Conta/Login?ReturnUrl=%2fCandidatos', {
			waitUntil: 'networkidle2'
		})
	} else {
		// Go To Compleo Login Page
		await page.goto('https://ats.compleo.com.br/Conta/Login?ReturnUrl=%2fCandidatos', {
			waitUntil: 'networkidle0'
		})

		// Write Username And Password
		await page.type('input[name="codigoEmpresa"]', config.codigoDaEmpresa, { delay: 30 })
		await page.type('input[name="Email"]', config.email, { delay: 30 })
		await page.type('input[name="Senha"]', config.senha, { delay: 30 })

		// Click Login Button
		await page.click('button[name="Entrar"]')

		// Wait For Navigation To Finish
		await page.waitForNavigation({ waitUntil: 'networkidle0' })
		await page.waitFor(10000)

		//  Check If Logged In
		// await page.screenshot({ path: 'Compleo.png' })

		// await browser.close()
	}
}

loginCompleo()
