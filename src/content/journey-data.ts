export type JourneyChapter = {
  id: string
  title: string
  dateRange: string
  summary: string
  countries: string[]
  archiveKeys: string[]
}

export const journeyChapters: JourneyChapter[] = [
  {
    id: 'departure',
    title: 'Departure',
    dateRange: 'September 2024',
    summary:
      'Leaving Florida, landing in Israel, and beginning the route with family, heritage, and a sense of rupture.',
    countries: ['Israel'],
    archiveKeys: ['2024-september'],
  },
  {
    id: 'middle-east-caucasus',
    title: 'Middle East + Georgia',
    dateRange: 'October 2024',
    summary:
      'Israel, Georgia, and a first layer of adventure capitalism, geopolitics, and deeper questions about where to build life.',
    countries: ['Israel', 'Georgia', 'UAE'],
    archiveKeys: ['2024-october'],
  },
  {
    id: 'east-africa',
    title: 'East Africa',
    dateRange: 'November 2024',
    summary:
      'Kenya, Tanzania, Rwanda, and one of the strongest stretches of perspective, contrast, and cultural learning.',
    countries: ['Kenya', 'Tanzania', 'Rwanda'],
    archiveKeys: ['2024-november'],
  },
  {
    id: 'south-and-southeast-asia',
    title: 'South + Southeast Asia',
    dateRange: 'December 2024 — July 2025',
    summary:
      'Nepal through Japan: trekking, motorbikes, islands, surf, and the broadest stretch of movement and reflection.',
    countries: [
      'Nepal',
      'Thailand',
      'Laos',
      'Cambodia',
      'China',
      'Vietnam',
      'Singapore',
      'Philippines',
      'Indonesia',
      'Japan',
    ],
    archiveKeys: [
      '2024-december',
      '2025-january',
      '2025-february',
      '2025-march',
      '2025-april',
      '2025-may',
      '2025-june',
      '2025-july',
    ],
  },
  {
    id: 'return-home',
    title: 'Return Home',
    dateRange: 'August 2025',
    summary:
      'Coming back to Florida and realizing the journey changed not just where to go, but what kind of life to construct.',
    countries: ['United States'],
    archiveKeys: ['2025-august'],
  },
  {
    id: 'central-america-builder-era',
    title: 'Builder Era',
    dateRange: 'October 2025 — April 2026',
    summary:
      'Costa Rica, Panama, Guatemala, El Salvador, Florida, and San Diego. Less drift, more building, clearer standards for place and lifestyle.',
    countries: [
      'Costa Rica',
      'Panama',
      'Guatemala',
      'El Salvador',
      'United States',
    ],
    archiveKeys: [
      '2025-october',
      '2025-november',
      '2025-december',
      '2026-january',
      '2026-february',
      '2026-march',
      '2026-april',
    ],
  },
  {
    id: 'euro-summer',
    title: 'Euro Summer',
    dateRange: 'May 2026 - Present',
    summary:
      'Rotterdam and the Netherlands opening a new European chapter while the builder era continues from abroad.',
    countries: ['Netherlands'],
    archiveKeys: ['2026-may'],
  },
]
