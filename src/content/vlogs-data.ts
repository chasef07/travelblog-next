export interface Vlog {
  id: string;
  title: string;
  country: string;
  description: string;
  youtubeId: string;
  thumbnail?: string;
}

export const vlogsData: Vlog[] = [
  {
    id: 'thailand-party',
    title: 'The Most Obnoxious Party Vlog',
    country: 'Thailand',
    description: 'An over-the-top party experience in Thailand with full moon festivities',
    youtubeId: 'dcW9QpgzUTo'
  },
  {
    id: 'nepal-culture',
    title: 'Uncovering the Beautiful Culture and Landscapes',
    country: 'Nepal',
    description: 'Exploring the beautiful culture and landscapes of the Himalayas',
    youtubeId: 'e9ws9xys6t0'
  },
  {
    id: 'tanzania-safari',
    title: 'Serengeti Safari Supershow',
    country: 'Tanzania',
    description: 'An incredible safari experience in the Serengeti',
    youtubeId: 'C_ghKFgvhn4'
  },
  {
    id: 'tanzania-hadza',
    title: 'Hunting with the Hadza Tribe',
    country: 'Tanzania',
    description: 'A unique cultural experience hunting with the traditional Hadza tribe',
    youtubeId: '_m29wjDWzBM'
  },
  {
    id: 'georgia-investment',
    title: 'Investing in Gudauri',
    country: 'Georgia',
    description: "Exploring Georgia's emerging ski destination and investment opportunities",
    youtubeId: 'GMkeFlztJ5Q'
  },
  {
    id: 'israel-conflict',
    title: 'Surviving the Largest Intercontinental Missile Attack',
    country: 'Israel',
    description: 'A firsthand account of surviving a historic missile attack in Israel',
    youtubeId: 'G3cQy-4Sr9M'
  }
];