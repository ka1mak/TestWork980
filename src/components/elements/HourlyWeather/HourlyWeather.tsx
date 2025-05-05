import { FC } from 'react'

import moment from 'moment'
import Image from 'next/image'

import { groupByDay } from '@/tools/group-by-day'
import { HourlyTypes } from '@/types/hourly'

import cls from './HourlyWeather.module.scss'

interface HourlyWeatherProps {
  weather: HourlyTypes.Root
}

export const HourlyWeather: FC<HourlyWeatherProps> = ({ weather }) => {
  const grouped = groupByDay(weather.list)

  return (
    <div className={cls.grid}>
      {grouped.map(([date, items]) => (
        <div key={date} className={cls.grid_item}>
          <h4>{moment(date).format('ddd, DD MMM')}</h4>

          <div>
            {items.map((item, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <HourlyForecastCard key={idx} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

interface HourlyForecastCardProps {
  item: HourlyTypes.List;
}

const HourlyForecastCard = ({ item }: HourlyForecastCardProps) => {
  const time = moment(item.dt_txt).format('HH:mm')
  const temp = Math.round(item.main.temp)
  const icon = item.weather[0]?.icon
  const desc = item.weather[0]?.description

  return (
    <div className="d-flex gap-2 align-items-center">
      <Image
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={desc}
        width={40}
        height={40}
      />
      <span>{time}</span>
      <span>{temp}°</span>
      <span>{desc}</span>
    </div>
  )
}
