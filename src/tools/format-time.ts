import moment from 'moment'

export const formatLocalTime = (unix: number, timezoneOffsetSec: number): string => {
  return moment.unix(unix + timezoneOffsetSec)
    .utc()
    .format('hh:mm A')
}
