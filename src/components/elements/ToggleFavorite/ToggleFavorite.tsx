'use client'

import { FC, useEffect, useState } from 'react'

import { FaRegStar, FaStar } from 'react-icons/fa'

import { useFavoritesStore } from '@/store/useFavorites'
import { IFavoriteCity } from '@/types/favorites'

import cls from './ToggleFavorite.module.scss'

interface ToggleFavoriteProps {
  city: IFavoriteCity
}

export const ToggleFavorite: FC<ToggleFavoriteProps> = ({ city }) => {
  const toggleFavorite = useFavoritesStore(s => s.toggleFavorite)
  const isFavorite  = useFavoritesStore(s => s.isFavorite)
  // Подписка на favorites необходима, чтобы компонент реагировал на изменения
  // Без неё Zustand не вызовет перерендер, и иконка не обновится при добавлении/удалении города
  // eslint-disable-next-line
  const favorites = useFavoritesStore(s => s.favorites)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [city])

  // Проверка на клиентский рендер. Нужна, чтобы избежать ошибки гидрации
  // Иконка может отличаться между сервером и клиентом до загрузки store.
  // Проверка на клиентский рендер. typeof window не подходит, потому что SSR возвращает статичный HTML
  if (!isClient) return null

  return (
    <button onClick={() => toggleFavorite(city)} className={cls.btn}>
      {isFavorite(city) ? <FaStar /> : <FaRegStar />}
    </button>
  )
}
