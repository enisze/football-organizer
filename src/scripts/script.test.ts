/**
 * @jest-environment node
 */

// import { sendEmail } from '@/inngest/createSendEmail'
const test = require('date-fns')
const locale = require('date-fns/locale')
require('dotenv').config({ path: '../.env' })

const client = require('@sendinblue/client')

const apiInstance = new client.TransactionalEmailsApi()

apiInstance.setApiKey(
  client.TransactionalEmailsApiApiKeys.apiKey,
  process.env.SENDINBLUE_API_KEY ?? '',
)

const redColor = 'rgb(175, 18, 29)'
const greenColor = 'rgb(131, 176, 34)'

require('expect-puppeteer')

const time = '20:00h'
const time2 = '8:00:h'

const dateTime = '20:00:00.000Z'

// console.log('starting script')
const date = new Date()
const week = test.getWeek(date)

describe('Booking reminder', () => {
  it('Should remind booking"', async () => {
    console.log(week)

    const url = `https://unisport.koeln/sportspiele/fussball/soccerbox/einzeltermin_buchung/soccerbox1/index_ger.html?y=2023&w=${week}`

    const soccerDate = getSoccerDate()

    await page.goto(url)

    const classValue = 'Mo'
    const cssSelector = `td[class="${classValue}"][datetime="${soccerDate.toISOString()}"]`

    try {
      const tdElement = await page.waitForSelector(cssSelector, {
        timeout: 10000,
      })

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
      }
    } catch (error) {
      console.log(error.response.body)
    }
  })
})

const getSoccerDate = () => {
  const date = new Date()

  const dateForSoccer = test.startOfWeek(test.addWeeks(date, 1), {
    weekStartsOn: 1,
    locale: locale.de,
  })

  dateForSoccer.setHours(20)
  dateForSoccer.setMinutes(0)
  dateForSoccer.setSeconds(0)
  dateForSoccer.setMilliseconds(0)

  return dateForSoccer
}

const sendEmail = async (email, html, subject) => {
  const sendSmptMail = new client.SendSmtpEmail()

  sendSmptMail.to = [{ email }]
  sendSmptMail.htmlContent = html
  sendSmptMail.sender = {
    email: 'eniszej@gmail.com',
    name: 'Event Wizard',
  }
  sendSmptMail.subject = subject

  return await apiInstance.sendTransacEmail(sendSmptMail)
}