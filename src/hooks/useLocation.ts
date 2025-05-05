import { useEffect, useState } from 'react'

import { Coordinates } from '@/types/coordinates'

export const useLocation = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)

  const getLocations = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        setCoordinates({ lat, lon })
      },
      (error) => {
        switch (error.code) {
          case 1:
            setErrorMessage('You have rejected a location request. Please allow access and reload the page!')
            break
          case 2:
            setErrorMessage('Could not determine your location. Make sure your GPS or Internet connection is turned on!')
            break
          case 3:
            setErrorMessage('The time to wait for a response from the device has expired. Try again or check the connection!')
            break
          default:
            setErrorMessage('An unknown error occurred while getting the location!')
        }
      },
      {
        timeout: 5000,
        enableHighAccuracy: true,
        maximumAge: 0,
      },
    )
  }

  useEffect(() => {
    getLocations()
  }, [])

  return {
    coordinates,
    errorMessage,
    getLocations,
  }
}
