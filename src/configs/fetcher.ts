const API_CONFIGS = {
  WEATHER_URL: process.env.NEXT_PUBLIC_WEATHER_API,
  API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  GEO_URL: process.env.NEXT_PUBLIC_GEO_API,
}

class HttpFetcher {
  async createEndPoint(endpoint: string, params: Record<string, string | number>): Promise<string> {
    const searchParams = new URLSearchParams({
      ...params,
      units: 'metric',
      appid: API_CONFIGS.API_KEY || '',
    })

    return `${endpoint}?${searchParams.toString()}`
  }

  async fetchData<Response>(url: string): Promise<Response> {
    const response = await fetch(url)

    if (!response.ok) {
      const errorText = await response.text()

      throw new Error(`HTTP Error ${response.status}: ${response.statusText}. ${errorText}`)
    }

    return response.json() as Promise<Response>
  }
}

export const fetcher = new HttpFetcher()
