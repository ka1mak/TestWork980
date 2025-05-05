import moment from 'moment'

import { HourlyTypes } from '@/types/hourly'

export const groupByDay = (list: HourlyTypes.List[]) => {
  const map = new Map<string, HourlyTypes.List[]>()

  list.forEach((item) => {
    const day = moment(item.dt_txt).format('YYYY-MM-DD')

    if (!map.has(day)) map.set(day, [])
    map.get(day)!.push(item)
  })

  return Array.from(map.entries()).slice(0, 7) // максимум 7 дней
}
