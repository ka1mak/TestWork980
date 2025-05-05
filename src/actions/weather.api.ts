import { API_CONFIGS, fetcher } from '@/configs/fetcher'
import { Coordinates } from '@/types/coordinates'
import { HourlyTypes } from '@/types/hourly'
import { SearchTypes } from '@/types/search'
import { WeatherTypes } from '@/types/weather'

export const getCurrentWeather = (coordinates: Coordinates): Promise<WeatherTypes.Root> => {
  const url = fetcher.createEndPoint(
    `${API_CONFIGS.WEATHER_URL}/weather`,
    { ...coordinates },
  )

  return fetcher.fetchData<WeatherTypes.Root>(url, { next: { revalidate: 3600 } })
}

export const getHourlyWeather = (coordinates: Coordinates): Promise<HourlyTypes.Root> => {
  const url = fetcher.createEndPoint(
    `${API_CONFIGS.WEATHER_URL}/forecast`,
    { ...coordinates },
  )

  return fetcher.fetchData<HourlyTypes.Root>(url, { next: { revalidate: 3600 } })
}

export const getWeatherByName = (name: string): Promise<SearchTypes.Response> => {
  const url = fetcher.createEndPoint(`${API_CONFIGS.GEO_URL}/direct`, {
    q: name,
    limit: 5,
  })

  return fetcher.fetchData<SearchTypes.Response>(url)
}
