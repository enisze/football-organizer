import { getWeek } from 'date-fns'
import puppeteer from 'puppeteer'

import { sendEmail } from '@/inngest/createSendEmail'
import { getSoccerDate } from './getSoccerDate'

const redColor = 'rgb(175, 18, 29)'
const greenColor = 'rgb(131, 176, 34)'

const time = '20:00h'
const time2 = '8:00:h'

const dateTime = '20:00:00.000Z'

let intervalId: NodeJS.Timer | null = null

const runScript = async () => {
  console.log('starting script')
  const date = new Date()
  const week = getWeek(date)

  const url = `https://unisport.koeln/sportspiele/fussball/soccerbox/einzeltermin_buchung/soccerbox1/index_ger.html?y=2023&w=${
    week + 1
  }`

  //---FOR DOCKER---
  // const browser = await puppeteer.connect({
  //   browserWSEndpoint: "ws://chrome:3000"
  // })

  const soccerDate = getSoccerDate()

  //---FOR LOCAL---
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: false,
  })

  try {
    const page = await browser.newPage()
    await page.goto(url)

    const classValue = 'Mo'
    const cssSelector = `td[class="${classValue}"][datetime="${soccerDate.toISOString()}"]`
    const tdElement = await page.waitForSelector(cssSelector, { timeout: 5000 })

    if (!tdElement) {
      console.log('Fehler, kein tdElement gefunden')

      await sendEmail(
        'eniszej@gmail.com',
        `<div>Fehler, kein tdElement gefunden</div>`,
        'Soccer Error',
      )
      return
    }

    const linkName = '.uzk15__eventunit'
    const linkElement = await tdElement.$(linkName)

    if (!linkElement) {
      console.log('Noch nicht buchbar, kein Link')
      return
    }

    const hrefValue = await linkElement.evaluate((el) =>
      el.getAttribute('href'),
    )

    const className = '.uzk15__kreis'

    let colorValue = ''

    try {
      const color = await tdElement.$(className)

      if (!color) {
        console.log('Fehler, keine Color gefunden')

        await sendEmail(
          'eniszej@gmail.com',
          `<div>Fehler, keine Color gefunden</div>`,
          'Soccer Error',
        )
        return
      }

      colorValue = await color.evaluate(
        (el) => getComputedStyle(el).backgroundColor,
      )
    } catch (error) {
      if (intervalId) clearInterval(intervalId) // Clear the interval to stop the script
    }

    console.log(colorValue)

    const targetField = await tdElement.evaluate((el) => el.textContent)

    if (
      targetField?.includes(time) === false &&
      targetField?.includes(time2) === false
    ) {
      console.log('Falsche Uhrzeit', targetField, time)

      await sendEmail(
        'eniszej@gmail.com',
        `<div>Fehler, falsche Uhrzeit gewaehlt</div>`,
        'Soccer Error',
      )
      return
    }

    if (colorValue === redColor) {
      console.log('Gebucht')
      return
    }

    if (colorValue === greenColor) {
      console.log('Buchbar')
      await sendEmail(
        'eniszej@gmail.com',
        `<a href=${hrefValue}>Buchen</a>`,
        'Soccer reminder',
      )
      if (intervalId) clearInterval(intervalId) // Clear the interval to stop the script
    }
  } catch (error) {
    console.log(error)
  } finally {
    // await browser.close()
  }
}

const fiveMinutes = 5 * 60 * 1000 // 5 minutes in milliseconds

// Function to run the script every 5 minutes
const runEveryFiveMinutes = () => {
  runScript() // Run the script immediately

  // Set up the interval to run the script every 5 minutes
  intervalId = setInterval(() => {
    runScript()
  }, fiveMinutes)
}

//Local
// runScript()

// Call the function to start running the script
runEveryFiveMinutes()
