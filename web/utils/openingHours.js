import { utcToZonedTime } from 'date-fns-tz'
import { getDay, isWithinInterval } from 'date-fns'

const WEEKDAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
]

const checkIfStoreIsOpen = openingHours => {
  if (!openingHours) return null
  const now = utcToZonedTime(new Date(), 'Europe/Oslo')
  const day = now.getDay()
  // Convert day from number into string eg. 0 === 'sunday' || 1 === 'monday'
  const weekday = WEEKDAYS[day]
  // Find opening hours from sanity
  const openingDay = openingHours[weekday]
  // Extract input to use in date constructors eg. openingTime and closingTime
  const month = now.getMonth()
  const year = now.getFullYear()
  const date = now.getDate()
  // Extract opening and closing times from sanity
  let [openingHour, openingMinute] = openingDay.from
    .split(':')
    .map(item => parseInt(item))
  let [closingHour, closingMinute] = openingDay.to
    .split(':')
    .map(item => parseInt(item))
  // Construct opening date with opening time
  const openingTime = new Date(year, month, date, openingHour, openingMinute, 0)
  // Construct closing date with closing time
  const closingTime = new Date(year, month, date, closingHour, closingMinute, 0)
  // Check if now is between opening and closing time
  return isWithinInterval(now, {
    start: openingTime,
    end: closingTime
  })
}

export default checkIfStoreIsOpen
