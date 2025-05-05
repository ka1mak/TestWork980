/* eslint-disable no-unused-vars */
import { create } from 'zustand'

import { getCurrentWeather } from '@/actions/weather.api'
import { Coordinates } from '@/types/coordinates'
import { WeatherTypes } from '@/types/weather'

interface WeatherStore {
  weather: WeatherTypes.Root | null
  isLoading: boolean
  error: string | null
  fetch: (coords: Coordinates) => Promise<void>
  hydrate: (data: WeatherTypes.Root) => void
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weather: null,
  isLoading: false,
  error: null,

  async fetch(coords: Coordinates) {
    set({ isLoading: true })

    try {
      const data = await getCurrentWeather(coords)

      set({ weather: data, error: null })
    } catch (e) {
      set({ error: (e as Error).message })
    } finally {
      set({ isLoading: false })
    }
  },

  hydrate(data) {
    set({ weather: data })
  },
}))
