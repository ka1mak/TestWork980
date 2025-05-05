/* eslint-disable no-unused-vars */
import { create } from 'zustand'

import { LocalStorage } from '@/tools/local-storage'
import { IFavoriteCity } from '@/types/favorites'

interface FavoritesStoreTypes {
  favorites: IFavoriteCity[]
  setToFavorites: (city: IFavoriteCity) => void
  removeFromFavorites: (city: IFavoriteCity) => void
  getFavorites: () => void
  isFavorite: (city: IFavoriteCity) => boolean
  toggleFavorite: (city: IFavoriteCity) => void
}

export const useFavoritesStore = create<FavoritesStoreTypes>((set, get) => ({
  favorites: [],

  setToFavorites: (city: IFavoriteCity) => {
    const oldFavorites = LocalStorage.get<IFavoriteCity[]>('favorites') || []

    const isExists = oldFavorites.some(
      (item) =>
        item.coordinates.lat === city.coordinates.lat &&
        item.coordinates.lon === city.coordinates.lon,
    )

    if (!isExists) {
      const updated = [...oldFavorites, city]

      LocalStorage.set('favorites', updated)
      set({ favorites: updated })
    }
  },

  removeFromFavorites: (city: IFavoriteCity) => {
    const oldFavorites = LocalStorage.get<IFavoriteCity[]>('favorites') || []

    const newFavorites = oldFavorites.filter(
      (item) =>
        item.coordinates.lat !== city.coordinates.lat ||
        item.coordinates.lon !== city.coordinates.lon,
    )

    LocalStorage.set('favorites', newFavorites)
    set({ favorites: newFavorites })
  },

  toggleFavorite: (city: IFavoriteCity) => {
    const list = LocalStorage.get<IFavoriteCity[]>('favorites') || []

    const isExists = list.some(
      (item) =>
        item.coordinates.lat === city.coordinates.lat &&
        item.coordinates.lon === city.coordinates.lon,
    )

    const updated = isExists
      ? list.filter(
        (item) =>
          item.coordinates.lat !== city.coordinates.lat ||
            item.coordinates.lon !== city.coordinates.lon,
      )
      : [...list, city]

    LocalStorage.set('favorites', updated)
    set({ favorites: updated })
  },

  getFavorites: () => set({ favorites: LocalStorage.get<IFavoriteCity[]>('favorites') || [] }),

  isFavorite: (city: IFavoriteCity) => {
    const list = get().favorites

    return list.some(
      (item) =>
        item.coordinates.lat === city.coordinates.lat &&
        item.coordinates.lon === city.coordinates.lon,
    )
  },
}))
