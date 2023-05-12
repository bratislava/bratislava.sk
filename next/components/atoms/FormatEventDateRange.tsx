import {
  isSameDay,
  isSameMonth,
  isSameYear,
  parseAbsolute,
  ZonedDateTime,
} from '@internationalized/date'
import { bratislavaTimezone } from '@utils/consts'
import React from 'react'
import { useDateFormatter } from 'react-aria'

const hyphenCharacter = '–'

type PartsProps = {
  parsedDateFrom: ZonedDateTime
  parsedDateTo?: ZonedDateTime
  parsedDateFromDate: Date
  parsedDateToDate?: Date
}

const DatePart = ({
  parsedDateFrom,
  parsedDateTo,
  parsedDateFromDate,
  parsedDateToDate,
}: PartsProps) => {
  const dayFormatter = useDateFormatter({ day: 'numeric', timeZone: bratislavaTimezone })
  const dayMonthFormatter = useDateFormatter({
    day: 'numeric',
    month: 'numeric',
    timeZone: bratislavaTimezone,
  })
  const formatter = useDateFormatter({
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    timeZone: bratislavaTimezone,
  })

  if (!parsedDateTo || !parsedDateToDate) {
    return <>{formatter.format(parsedDateFromDate)}</>
  }

  if (isSameDay(parsedDateFrom, parsedDateTo)) {
    return <>{formatter.format(parsedDateFromDate)}</>
  }

  if (isSameMonth(parsedDateFrom, parsedDateTo)) {
    return (
      <>
        {dayFormatter.format(parsedDateFromDate)} {hyphenCharacter}{' '}
        {formatter.format(parsedDateToDate)}
      </>
    )
  }

  if (isSameYear(parsedDateFrom, parsedDateTo)) {
    return (
      <>
        {dayMonthFormatter.format(parsedDateFromDate)} {hyphenCharacter}{' '}
        {formatter.format(parsedDateToDate)}
      </>
    )
  }

  return (
    <>
      {formatter.format(parsedDateFromDate)} {hyphenCharacter} {formatter.format(parsedDateToDate)}
    </>
  )
}

const TimePart = ({
  parsedDateFrom,
  parsedDateTo,
  parsedDateFromDate,
  parsedDateToDate,
}: PartsProps) => {
  const formatter = useDateFormatter({
    hour: 'numeric',
    minute: 'numeric',
    timeZone: bratislavaTimezone,
  })

  if (!parsedDateTo || !parsedDateToDate) {
    return <>{formatter.format(parsedDateFromDate)}</>
  }

  if (parsedDateFrom.hour === parsedDateTo.hour && parsedDateFrom.minute === parsedDateTo.minute) {
    return <>{formatter.format(parsedDateFromDate)}</>
  }

  return (
    <>
      {formatter.format(parsedDateFromDate)} {hyphenCharacter} {formatter.format(parsedDateToDate)}
    </>
  )
}

type FormatEventDateRangeProps = { dateFrom?: string; dateTo?: string }

/**
 * Formats date range to easily readable short-form.
 *
 * E.g.
 * When they are in the same day:
 * `1. 12. 2022, 18:00 – 20:00`
 *
 * When they are in the same month:
 * `1. – 31. 12. 2022, 18:00 – 20:00`
 *
 * When they are in the same year:
 * `1. 1. – 31. 12. 2022, 18:00 – 20:00`
 *
 * Otherwise:
 * `1. 1. 2021 – 31. 12.2022, 18:00 – 20:00`
 */
const FormatEventDateRange = ({ dateFrom, dateTo }: FormatEventDateRangeProps) => {
  if (!dateFrom) {
    return null
  }
  const parsedDateFrom = parseAbsolute(dateFrom, bratislavaTimezone)
  const parsedDateFromDate = parsedDateFrom.toDate()

  const parsedDateTo = dateTo ? parseAbsolute(dateTo, bratislavaTimezone) : undefined
  const parsedDateToDate = parsedDateTo ? parsedDateTo.toDate() : undefined

  return (
    <>
      <DatePart
        parsedDateFrom={parsedDateFrom}
        parsedDateTo={parsedDateTo}
        parsedDateFromDate={parsedDateFromDate}
        parsedDateToDate={parsedDateToDate}
      />
      ,{' '}
      <TimePart
        parsedDateFrom={parsedDateFrom}
        parsedDateTo={parsedDateTo}
        parsedDateFromDate={parsedDateFromDate}
        parsedDateToDate={parsedDateToDate}
      />
    </>
  )
}

export default FormatEventDateRange
