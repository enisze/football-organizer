import { sendEmail } from '@/inngest/createSendEmail'
import { addWeeks, getWeek, startOfWeek } from 'date-fns'
import { de } from 'date-fns/locale'

const redColor = 'rgb(175, 18, 29)'
const greenColor = 'rgb(131, 176, 34)'

const time = '20:00h'
const time2 = '8:00:h'

const date = new Date()
const week = getWeek(date)

const days = ['Mo']

describe('Booking reminder', () => {
  const soccerboxesBookable: {
    soccerbox: number
    hrefValue: string | null
    day: string
  }[] = []
  const soccerboxesError: {
    soccerbox: number
    error?: string
    day: string
  }[] = []
  it('Should remind booking"', async () => {
    for (let soccerbox = 1; soccerbox < 4; soccerbox++) {
      for (const day in days) {
        const url = `https://unisport.koeln/sportspiele/fussball/soccerbox/einzeltermin_buchung/soccerbox${soccerbox}/index_ger.html?y=2023&w=${
          week + 1
        }`

        const soccerDate = getSoccerDate(day)

        await page.goto(url)

        console.log(`starting Soccerbox ${soccerbox}`)

        console.log(soccerDate)

        const cssSelector = `td[class="${day}"][datetime="${soccerDate.toISOString()}"]`

        try {
          const tdElement = await page.waitForSelector(cssSelector, {
            timeout: 5000,
          })

          if (!tdElement) {
            soccerboxesError.push({
              soccerbox,
              error: 'Fehler, kein tdElement gefunden',
              day,
            })

            continue
          }

          const linkName = '.uzk15__eventunit'
          const linkElement = await tdElement.$(linkName)

          if (!linkElement) {
            soccerboxesError.push({
              soccerbox,
              error: 'Noch nicht buchbar, kein Link',
              day,
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
              day,
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
              day,
            })

            continue
          }

          if (colorValue === redColor) {
            soccerboxesError.push({
              soccerbox,
              error: 'Gebucht',
              day,
            })

            continue
          }

          if (colorValue === greenColor) {
            soccerboxesBookable.push({
              soccerbox,
              hrefValue,
              day,
            })
          }
        } catch (error) {
          //@ts-expect-error there is such at hing
          if ('response' in error) {
            //@ts-expect-error there is such at hing
            console.log(error.response?.body)
          }
        }
      }
    }

    console.log(soccerboxesBookable, soccerboxesError)
    if (soccerboxesBookable.length > 0) {
      try {
        await sendEmail(
          'eniszej@gmail.com',
          `
        <h1>Es gibt buchbare Soccerboxen für </h1>
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
      } catch (error) {
        console.log('Sending email failed')
        console.log(error)
      }
    }
  }, 50000)
})

const getSoccerDate = (day: string) => {
  const offset = (days.indexOf(day) + 1) as 0 | 1 | 2 | 3 | 4 | 5 | 6

  const date = new Date()

  if (offset < 0 || offset > 6) return date

  const dateForSoccer = startOfWeek(addWeeks(date, offset), {
    weekStartsOn: offset,
    locale: de,
  })

  dateForSoccer.setHours(20)
  dateForSoccer.setMinutes(0)
  dateForSoccer.setSeconds(0)
  dateForSoccer.setMilliseconds(0)

  return dateForSoccer
}
