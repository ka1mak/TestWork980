import { FC, Fragment } from 'react'

import clsx from 'clsx'
import Image from 'next/image'
import {
  BsThermometer,
  BsDroplet,
  BsSpeedometer2,
  BsEye,
  BsWind,
} from 'react-icons/bs'
import {
} from 'react-icons/wi'

import { ToggleFavorite } from '@/components/elements/ToggleFavorite/ToggleFavorite'
import { formatLocalTime } from '@/tools/format-time'
import { IFavoriteCity } from '@/types/favorites'
import { WeatherTypes } from '@/types/weather'

import cls from './WeatherCard.module.scss'

interface WeatherCardProps {
  weather: WeatherTypes.Root
}

export const WeatherCard: FC<WeatherCardProps> = ({ weather }) => {
  const city: IFavoriteCity = {
    coordinates: {
      lat: weather.coord.lat,
      lon: weather.coord.lon,
    },
    name: weather.name,
  }

  return (
    <Fragment>
      <div className="border rounded-3 p-2">
        <div className="px-2">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <span className="fs-3"><span className="fw-bold">{weather.name}</span></span>

              <Image
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                width={60}
                height={60}
              />
            </div>

            <ToggleFavorite city={city} />
          </div>

          <div className="d-flex align-items-center border-bottom">
            <span className="fw-medium">Feels Like: {weather.main.temp.toFixed(0)}°</span>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row gap-2 px-2">
          <ul className="flex-grow-1 list-group list-group-flush">
            <Item icon={<BsThermometer />} label="High" value={`${weather.main.temp_max.toFixed(0)}°`} />

            <Item icon={<BsThermometer />} label="Low" value={`${weather.main.temp_min.toFixed(0)}°`} />

            <Item icon={<BsDroplet />} label="Humidity" value={`${weather.main.humidity}%`} />
          </ul>

          <ul className={clsx('flex-grow-1 list-group list-group-flush', cls.br)}>
            <Item icon={<BsWind />} label="Wind" value={`${(weather.wind.speed * 2.237).toFixed(0)} mph`} />

            <Item icon={<BsEye />} label="Visibility" value={`${(weather.visibility / 1609).toFixed(1)} mi`} />

            <Item icon={<BsSpeedometer2 />} label="Pressure" value={weather.main.pressure} />
          </ul>
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row gap-2 gap-2">
        <div className={clsx('p-3 flex flex-grow-1 border rounded-3', cls.card)}>
          <div className="p-0 bg-transparent fw-medium fs-5">Atmosphere</div>

          <div className="p-0">
            <div className={clsx('d-flex justify-content-between', cls.card_list_item)}>
              <span>Pressure:</span>
              <span>{weather.main.pressure} hPa</span>
            </div>
            <div className={clsx('d-flex justify-content-between', cls.card_list_item)}>
              <span>Cloudiness:</span>
              <span>{weather.clouds.all}%</span>
            </div>
            <div className={clsx('d-flex justify-content-between', cls.card_list_item)}>
              <span>Visibility:</span>
              <span>{weather.visibility} m</span>
            </div>
            <div className={clsx('d-flex justify-content-between', cls.card_list_item)}>
              <span>Precipitation:</span>
              <span>{weather.rain?.['1h'] ?? 0} mm</span>
            </div>
          </div>
        </div>

        <div className={clsx('p-3 flex flex-grow-1 border rounded-3', cls.card)}>
          <div className="p-0 bg-transparent fw-medium fs-5">Location</div>

          <div className="p-0">
            <div className={clsx('d-flex justify-content-between', cls.card_list_item)}>
              <span>Coordinates:</span>
              <span>{weather.coord.lat.toFixed(4)}, {weather.coord.lon.toFixed(4)}</span>
            </div>
            <div className={clsx('d-flex justify-content-between', cls.card_list_item)}>
              <span>Country:</span>
              <span>{weather.sys.country}</span>
            </div>
            <div className={clsx('d-flex justify-content-between', cls.card_list_item)}>
              <span>Sunrise:</span>
              <span>{formatLocalTime(weather.sys.sunrise, weather.timezone)}</span>
            </div>
            <div className={clsx('d-flex justify-content-between', cls.card_list_item)}>
              <span>Sunset:</span>
              <span>{formatLocalTime(weather.sys.sunset, weather.timezone)}</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

interface ItemProps {
  icon: React.ReactElement
  label: string
  value: string | number
}

const Item: React.FC<ItemProps> = ({ icon, label, value }) => (
  <li className={clsx('list-group-item d-flex align-items-center justify-content-between px-0 px-md-2 bg-transparent', cls.list_item)}>
    <div className="d-flex align-items-center gap-2">
      <span className="fs-5">{icon}</span>
      <span>{label}</span>
    </div>
    <span className="fw-semibold">{value}</span>
  </li>
)
