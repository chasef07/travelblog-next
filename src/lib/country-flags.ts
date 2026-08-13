export const countryCodes = {
  Belgium: 'BE',
  'Bosnia and Herzegovina': 'BA',
  Cambodia: 'KH',
  China: 'CN',
  'Costa Rica': 'CR',
  'El Salvador': 'SV',
  Georgia: 'GE',
  Guatemala: 'GT',
  Indonesia: 'ID',
  Israel: 'IL',
  Italy: 'IT',
  Japan: 'JP',
  Kenya: 'KE',
  Laos: 'LA',
  Montenegro: 'ME',
  Nepal: 'NP',
  Netherlands: 'NL',
  Panama: 'PA',
  Philippines: 'PH',
  Portugal: 'PT',
  Rwanda: 'RW',
  Singapore: 'SG',
  Switzerland: 'CH',
  Tanzania: 'TZ',
  Thailand: 'TH',
  UAE: 'AE',
  USA: 'US',
  Vietnam: 'VN',
} as const

export type CountryCode = (typeof countryCodes)[keyof typeof countryCodes]

const countryAliases: Record<string, keyof typeof countryCodes> = {
  'United States': 'USA',
}

export function getCountryCode(country?: string): CountryCode | undefined {
  if (!country) return undefined

  const name = countryAliases[country] ?? country
  return countryCodes[name as keyof typeof countryCodes]
}
