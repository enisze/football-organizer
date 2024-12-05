import { addDays, isAfter, isBefore, subDays } from 'date-fns'

const DAYS_AFTER_BOOKING_DATE = 9
export const isDateInCertainRange = (
	paypalPaymentDate: Date,
	bookingDate: Date
) => {
	const endRange = addDays(bookingDate, DAYS_AFTER_BOOKING_DATE)

	const startRange = subDays(bookingDate, 1)

	return (
		isBefore(paypalPaymentDate, endRange) &&
		isAfter(paypalPaymentDate, startRange)
	)
}
