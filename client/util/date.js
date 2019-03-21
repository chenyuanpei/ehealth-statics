import moment from 'moment'

export const getByWeekInYear = ({year, week}) => {
  if (!year || !week) {
    return
  }
  const m = moment()
  m.set({
    year,
    weeks: week
  })

  return m.startOf('isoWeek')
}

/**
 * 使用方法：
 *
 * const [first, end] = weekFirstAndEnd({year: 2016, week: 1, format: 'YYYY-MM-DD'})
 *
 * @param year
 * @param week
 * @param format
 * @returns {*[]}
 */
export const weekFirstAndEnd = ({
  year,
  week,
  format = 'YYYY-MM-DD'
}) => {
  const m = getByWeekInYear({year, week})

  if (!m) {
    return [undefined, undefined]
  }

  return [m.startOf('isoWeek').format(format), m.endOf('isoWeek').format(format)]
}
