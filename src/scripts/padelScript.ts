import { sendEmail } from '@/inngest/createSendEmail'
import { addWeeks, getWeek, setDay } from 'date-fns'
import puppeteer from 'puppeteer'

const redColor = 'rgb(175, 18, 29)'
const greenColor = 'rgb(131, 176, 34)'

const date = new Date()
const week = getWeek(date)

const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

const times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const padelBookable: {
	hrefValue: string | null
	day: string
}[] = []
const padelError: {
	error?: string
	day: string
	hour: number
}[] = []

const script = async () => {
	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
		headless: false
	})

	const page = await browser.newPage()
	await page.setViewport({
		height: 1080,
		width: 1920
	})

	for (const day of days) {
		const url = `https://unisport.koeln/sportspiele/padel/padel_platzreservierung/index_ger.html?y=2024&w=${week}`

		for (const hour of times) {
			const soccerDate = getSoccerDate(day, hour)

			await page.goto(url)

			const cssSelector = `td[class="${day}"][datetime="${soccerDate.toISOString()}"]`

			const tdElement = await page.waitForSelector(cssSelector, {
				timeout: 5000
			})

			if (!tdElement) {
				padelError.push({
					error: 'Fehler, kein tdElement gefunden',
					day,
					hour
				})

				continue
			}

			const linkName = '.uzk15__eventunit'
			const linkElement = await tdElement.$(linkName)

			if (!linkElement) {
				padelError.push({
					error: 'Noch nicht buchbar, kein Link',
					day,
					hour
				})
				continue
			}

			const hrefValue = await linkElement.evaluate((el) =>
				el.getAttribute('href')
			)

			const className = '.uzk15__kreis'

			let colorValue = ''

			const color = await tdElement.$(className)

			if (!color) {
				padelError.push({
					error: 'Fehler, keine Color gefunden',
					day,
					hour
				})
				continue
			}

			colorValue = await color.evaluate(
				(el) => getComputedStyle(el).backgroundColor
			)

			if (colorValue === redColor) {
				padelError.push({
					error: 'Gebucht',
					day,
					hour
				})

				continue
			}

			if (colorValue === greenColor) {
				padelBookable.push({
					hrefValue,
					day
				})
			}
		}
	}

	console.log(padelBookable, padelError)
	if (padelBookable.length > 0) {
		try {
			await sendEmail(
				'eniszej@gmail.com',
				`
        <h1>Es gibt buchbare Soccerboxen für </h1>
        <ul>
        ${padelBookable.map(
					(soccerbox) =>
						`<li> <a href="${soccerbox.hrefValue}">
            Padel hier buchen
            hier buchen</a></li>`
				)}
        ${padelError.map(
					(soccerbox) => `<li> Padel Fehler: ${soccerbox.error}</li>`
				)}
        </ul>
        `,
				'Es gibt buchbare Soccerboxen'
			)
		} catch (error) {
			console.log('Sending email failed')
			console.log(error)
		}
	}
}

const getSoccerDate = (day: string, hour: number) => {
	const offset = (days.indexOf(day) + 1) as 0 | 1 | 2 | 3 | 4 | 5 | 6

	const date = new Date()

	// if (offset < 0 || offset > 6) return date

	const weeks = addWeeks(date, 0)

	const dateForSoccer = setDay(weeks, offset)

	dateForSoccer.setHours(hour)
	dateForSoccer.setMinutes(0)
	dateForSoccer.setSeconds(0)
	dateForSoccer.setMilliseconds(0)

	return dateForSoccer
}

script()
