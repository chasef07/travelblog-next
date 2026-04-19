export interface GeoJSONGeometry {
  type: string
  coordinates: number[] | number[][] | number[][][] | number[][][][]
}

export interface GeoJSONFeature {
  type: string
  geometry: GeoJSONGeometry
}

export interface GeoJSON {
  type: string
  features: GeoJSONFeature[]
}

let geoJSONCache: GeoJSON | null = null
let geoJSONPromise: Promise<GeoJSON> | null = null

export async function fetchGeoJSON(): Promise<GeoJSON> {
  if (geoJSONCache) {
    return geoJSONCache
  }

  if (geoJSONPromise) {
    return geoJSONPromise
  }

  geoJSONPromise = fetch('/data/countries.geojson')
    .then((response) => response.json())
    .then((data) => {
      geoJSONCache = data
      return data
    })
    .catch((error) => {
      geoJSONPromise = null
      throw error
    })

  return geoJSONPromise
}
