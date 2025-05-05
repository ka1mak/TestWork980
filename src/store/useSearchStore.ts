/* eslint-disable no-unused-vars */
import { create } from 'zustand'

import { getWeatherByName } from '@/actions/weather.api'
import { SearchTypes } from '@/types/search'

interface SearchStore {
  searchValue: string
  onChangeSearchValue: (query: string) => void
  isFetching: boolean
  error: null | string
  data: SearchTypes.Response
  fetch: (query: string) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  data: [],
  error: null,
  isFetching: false,
  searchValue: '',

  onChangeSearchValue: (value: string) => {
    set({ searchValue: value })
  },

  fetch: async (query: string): Promise<void> => {
    set({ isFetching: true })

    try {
      const data = await getWeatherByName(query)

      set({ data })
    } catch (err) {
      const error = err as Error

      set({ error: error.message })
    } finally {
      set({ isFetching: false })
    }
  },
}))
