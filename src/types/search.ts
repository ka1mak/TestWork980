export namespace SearchTypes   {
  export type Response = Root[]

  export interface Root {
    name: string
    local_names: Record<string, string>
    lat: number
    lon: number
    country: string
    state?: string
  }
}
