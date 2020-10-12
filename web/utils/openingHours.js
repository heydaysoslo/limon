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
  // console.log('openingHours', openingHours)
  if (!openingHours) return null
  const now = utcToZonedTime(new Date(), 'Europe/Oslo')
  const day = now.getDay()
  const weekday = WEEKDAYS[day]
  const openingDay = openingHours[weekday]
  const month = now.getMonth()
  const year = now.getFullYear()
  const date = now.getDate()
  let [openingHour, openingMinute] = openingDay.from
    .split(':')
    .map(item => parseInt(item))
  let [closingHour, closingMinute] = openingDay.to
    .split(':')
    .map(item => parseInt(item))
  const openingTime = new Date(year, month, date, openingHour, openingMinute, 0)
  const closingTime = new Date(year, month, date, closingHour, closingMinute, 0)
  return isWithinInterval(now, {
    start: openingTime,
    end: closingTime
  })
}

export default checkIfStoreIsOpen
