import { addWeeks, getWeek, startOfWeek } from 'date-fns'
import puppeteer from 'puppeteer'

import { sendEmail } from '@/inngest/createSendEmail'
import { de } from 'date-fns/locale'

const redColor = 'rgb(175, 18, 29)'
const greenColor = 'rgb(131, 176, 34)'

const time = '20:00h'
const time2 = '8:00:h'

const soccerboxesBookable: { soccerbox: number; hrefValue: string | null }[] =
	[]
const soccerboxesError: {
	soccerbox: number
	errror?: string
	error?: string
}[] = []

const runScript = async () => {
	console.log('starting script')
	const date = new Date()
	const week = getWeek(date)

	//---FOR DOCKER---
	// const browser = await puppeteer.connect({
	//   browserWSEndpoint: "ws://chrome:3000"
	// })

	//---FOR LOCAL---
	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
		headless: false,
	})

	try {
		for (let soccerbox = 1; soccerbox < 2; soccerbox++) {
			const url = `https://unisport.koeln/sportspiele/fussball/soccerbox/einzeltermin_buchung/soccerbox${soccerbox}/index_ger.html?y=2023&w=${
				week + 1
			}`

			const page = await browser.newPage()

			const soccerDate = getSoccerDate()

			await page.goto(url)

			console.log(`starting Soccerbox ${soccerbox}`)

			console.log(soccerDate)

			const classValue = 'Di'
			const cssSelector = `td[class="${classValue}"][datetime="${soccerDate.toISOString()}"]`

			const tdElement = await page.waitForSelector(cssSelector, {
				timeout: 5000,
			})

			if (!tdElement) {
				soccerboxesError.push({
					soccerbox,
					errror: 'Fehler, kein tdElement gefunden',
				})

				continue
			}

			const linkName = '.uzk15__eventunit'
			const linkElement = await tdElement.$(linkName)

			if (!linkElement) {
				soccerboxesError.push({
					soccerbox,
					errror: 'Noch nicht buchbar, kein Link',
				})
				continue
			}

			const hrefValue = await linkElement.evaluate((el) =>
				el.getAttribute('href'),
			)

			const className = '.uzk15__kreis'

			let colorValue = ''

			const color = await tdElement.$(className)

			if (!color) {
				soccerboxesError.push({
					soccerbox,
					error: 'Fehler, keine Color gefunden',
				})
				continue
			}

			colorValue = await color.evaluate(
				(el) => getComputedStyle(el).backgroundColor,
			)

			const targetField = await tdElement.evaluate((el) => el.textContent)

			if (
				targetField?.includes(time) === false &&
				targetField?.includes(time2) === false
			) {
				soccerboxesError.push({
					soccerbox,
					error: `Falsche Uhrzeit ${targetField} ${time}`,
				})

				continue
			}

			if (colorValue === redColor) {
				soccerboxesError.push({
					soccerbox,
					error: 'Gebucht',
				})

				continue
			}

			if (colorValue === greenColor) {
				soccerboxesBookable.push({
					soccerbox,
					hrefValue,
				})
			}
		}
	} catch (error) {
		//@ts-expect-error there is such at hing
		if ('response' in error) {
			//@ts-expect-error there is such at hing
			console.log(error.response?.body)
		}
	}

	console.log(soccerboxesBookable, soccerboxesError)
	if (soccerboxesBookable.length > 0) {
		console.log('email send')
		sendEmail(
			'eniszej@gmail.com',
			`
        <h1>Es gibt buchbare Soccerboxen</h1>
        <ul>
        ${soccerboxesBookable.map(
					(soccerbox) =>
						`<li> <a href="${soccerbox.hrefValue}">
            Soccerbox ${soccerbox.soccerbox} hier buchen
            hier buchen</a></li>`,
				)}
        ${soccerboxesError.map(
					(soccerbox) =>
						`<li> Soccerbox ${soccerbox.soccerbox}, Fehler: ${soccerbox.error}</li>`,
				)}
        </ul>
        `,
			'Es gibt buchbare Soccerboxen',
		)
	}
}

const getSoccerDate = () => {
	const date = new Date()

	const dateForSoccer = startOfWeek(addWeeks(date, 2), {
		weekStartsOn: 2,
		locale: de,
	})

	dateForSoccer.setHours(20)
	dateForSoccer.setMinutes(0)
	dateForSoccer.setSeconds(0)
	dateForSoccer.setMilliseconds(0)

	return dateForSoccer
}

//Local
runScript()
