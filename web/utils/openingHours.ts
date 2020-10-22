import { utcToZonedTime } from 'date-fns-tz'
import { formatDistance, isWithinInterval, format } from 'date-fns'

const WEEKDAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
] as const

type weekdays = typeof WEEKDAYS[number]

type openingHours = {
  [weekday in weekdays]: { from: string; to: string }
}

const getOpeningsHours = (openingHours: openingHours) => {
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

  return {
    opening: openingTime,
    closing: closingTime
  }
}

export const getClosingHour = (openingHours: openingHours) => {
  if (!openingHours) return null
  const { closing } = getOpeningsHours(openingHours)
  return format(closing, 'HH:mm')
}

const checkIfStoreIsOpen = (openingHours: openingHours) => {
  if (!openingHours) return null
  const now = utcToZonedTime(new Date(), 'Europe/Oslo')
  const { opening, closing } = getOpeningsHours(openingHours)
  // Check if now is between opening and closing time
  return isWithinInterval(now, {
    start: opening,
    end: closing
  })
}

export const getRemainingTime = (openingHours: openingHours) => {
  if (!openingHours) return null
  const now = utcToZonedTime(new Date(), 'Europe/Oslo')
  const { opening, closing } = getOpeningsHours(openingHours)
  const isOpen = checkIfStoreIsOpen(openingHours)
  return isOpen
    ? formatDistance(now, closing, { addSuffix: false })
    : formatDistance(opening, now, { addSuffix: false })
}

export default checkIfStoreIsOpen
