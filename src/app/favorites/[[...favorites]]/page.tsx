'use client'

import { useEffect, useState } from 'react'

import { getCurrentWeather } from '@/actions/weather.api'
import { FavoriteWeatherCard } from '@/components/elements/FavoriteWeatherCard/FavoriteWeatherCard'
import { useFavoritesStore } from '@/store/useFavorites'
import { WeatherTypes } from '@/types/weather'

export default function Page() {
  const favorites = useFavoritesStore(s => s.favorites)
  const getFavorites = useFavoritesStore(s => s.getFavorites)

  useEffect(() => {
    getFavorites()
  }, [])

  return (
    <div className="container px-2 py-3 d-flex flex-column gap-2">
      {favorites.map(
        (item) => (
          <FavoritesItem
            key={item.coordinates.lat - item.coordinates.lon}
            lat={item.coordinates.lat}
            lon={item.coordinates.lon}
            name={item.name}
          />
        ),
      )}
    </div>
  )
}

interface FavoritesItemProps {
  lat: number
  lon: number
  name: string
}
// Компонент создан для изоляции состояния и HTTP-запроса погоды для каждого города
// Каждый город делает свой fetch и хранит данные локально в useState
// Если хранить данные в zustand, текущий ответ от http запроса будет переписываться следующим
const FavoritesItem = ({ lat, lon, name }: FavoritesItemProps) => {
  const [weather, setWeather] = useState<WeatherTypes.Root | null>(null)

  const fetch = async () => {
    const response = await getCurrentWeather({ lat, lon })

    setWeather(response)
  }

  useEffect(() => {
    fetch()
  }, [])

  if (!weather) return null

  return (
    <FavoriteWeatherCard weather={weather} name={name} />
  )
}
