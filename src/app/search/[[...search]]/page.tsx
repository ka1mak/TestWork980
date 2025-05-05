import { Metadata } from 'next'

import { getCurrentWeather, getHourlyWeather } from '@/actions/weather.api'
import { HourlyWeather } from '@/components/elements/HourlyWeather/HourlyWeather'
import { WeatherCard } from '@/components/elements/WeatherCard/WeatherCard'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { name } = await searchParams

  return {
    title: `Weather forecast for ${name}`,
    description: `Check current and hourly weather for ${name}.`,
  }
}

type SearchParams = Promise<{
  name: string
  lat: string
  lon: string
}>

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { lat, lon, name } = await searchParams

  const weather = await getCurrentWeather({ lat: Number(lat), lon: Number(lon) })
  const hourlyWeather = await getHourlyWeather({ lat: Number(lat), lon: Number(lon) })

  return (
    <div className="container px-2 py-3 d-flex flex-column gap-2">
      <WeatherCard weather={{ ...weather, name: name }} />
      <HourlyWeather weather={hourlyWeather} />
    </div>
  )
}
