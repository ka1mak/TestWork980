import { FC, Fragment } from 'react'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
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
import { IFavoriteCity } from '@/types/favorites'
import { WeatherTypes } from '@/types/weather'

import cls from './FavoriteWeatherCard.module.scss'

interface FavoriteWeatherCardProps {
  weather: WeatherTypes.Root
  name: string
}

export const FavoriteWeatherCard: FC<FavoriteWeatherCardProps> = ({ weather, name }) => {
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
              <Link href={`/${weather.name}?name=${name}&lat=${weather.coord.lat}&lon=${weather.coord.lon}`}>
                <span className="fs-3 fw-bold">
                  {weather.name}
                </span>
              </Link>

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
