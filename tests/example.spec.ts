import { sendEmail } from '@/inngest/createSendEmail'
import { expect, test } from '@playwright/test'
import { addWeeks, getWeek, startOfWeek } from 'date-fns'
import { de } from 'date-fns/locale'

const redColor = 'rgb(175, 18, 29)'
const greenColor = 'rgb(131, 176, 34)'

const time = '20:00h'
const time2 = '8:00:h'

const date = new Date()
const week = getWeek(date)

const soccerboxesBookable: { soccerbox: number; hrefValue: string | null }[] =
  []
const soccerboxesError: {
  soccerbox: number
  errror?: string
  error?: string
}[] = []

test('get started link', async ({ page }) => {
  for (let soccerbox = 1; soccerbox < 2; soccerbox++) {
    const url = `https://unisport.koeln/sportspiele/fussball/soccerbox/einzeltermin_buchung/soccerbox${soccerbox}/index_ger.html?y=2023&w=${
      week + 1
    }`

    const soccerDate = getSoccerDate()

    await page.goto(url)

    console.log(`starting Soccerbox ${soccerbox}`)

    await expect(page.locator('#calendar_slider span')).toHaveCount(0, {
      timeout: 10000,
    })

    // Define the exact datetime you're looking for
    // Define the exact datetime you're looking for
    const targetDatetime = '2023-10-24T18:00:00.000Z'

    // Find the desired `tr` element based on the datetime attribute
    const trSelector = `tr td.Di[datetime="${targetDatetime}"]`
    const trElement = page.locator(trSelector)

    if ((await trElement.count()) > 0) {
      // Extract the td and the link within the tr using selectors
      const tdElement = trElement.locator('td.Di')
      const linkElement = tdElement.locator('a')

      // Get the innerHTML of the td element
      const tdInnerHTML = await tdElement.innerText()

      // Get the href attribute of the link
      const linkHref = await linkElement.getAttribute('href')

      console.log('td innerHTML:', tdInnerHTML)
      console.log('Link URL:', linkHref)
    } else {
      console.log('TR element with the specified datetime not found')
    }

    console.log(soccerboxesBookable, soccerboxesError)
    if (soccerboxesBookable.length > 0) {
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
})

const getSoccerDate = () => {
  const date = new Date()

  const dateForSoccer = startOfWeek(addWeeks(date, 1), {
    weekStartsOn: 2,
    locale: de,
  })

  dateForSoccer.setHours(20)
  dateForSoccer.setMinutes(0)
  dateForSoccer.setSeconds(0)
  dateForSoccer.setMilliseconds(0)

  return dateForSoccer
}
