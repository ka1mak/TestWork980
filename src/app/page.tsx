import React from 'react'

import { getCurrentWeather, getHourlyWeather } from '@/actions/weather.api'
import { HourlyWeather } from '@/components/elements/HourlyWeather/HourlyWeather'
import { WeatherCard } from '@/components/elements/WeatherCard/WeatherCard'
import { coordinates } from '@/consts/coordinates'

export default async function Page() {
  const weather = await getCurrentWeather(coordinates)
  const hourlyWeather = await getHourlyWeather(coordinates)

  return (
    <div className="container px-2 py-3 d-flex flex-column gap-2">
      <WeatherCard weather={weather} />
      <HourlyWeather weather={hourlyWeather} />
    </div>
  )
}
