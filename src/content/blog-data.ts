import { BlogMetadata } from '../types/blog';

// Lightweight metadata for blog grid - images and excerpts only
export const blogMetadata: BlogMetadata[] = [
  { title: 'February 2026: Santa Teresa, Surfing and Building', date: 'February 2026', excerpt: 'A new month in Santa Teresa focused on deep work, consistent surfing, and building the next chapter.', image: '/assets/images/misc/santateresa-boys.jpg', link: '/blog/2026/february' },
  { title: 'January 2026: Exploring El Salvador', date: 'January 2026', excerpt: 'Leaving Guatemala for El Salvador\'s surf coast, a chance encounter with a pastor, and thoughts on government and infrastructure.', image: '/assets/images/misc/elsalvador-surfcity.jpg', link: '/blog/2026/january' },
  { title: 'December 2025: Guatemala Galavanting', date: 'December 2025', excerpt: 'Arriving in Guatemala after Hanukkah with family - one last backpacking adventure before starting a new section of life.', image: '/assets/images/blog/2025/december/guatflag.jpg', link: '/blog/2025/december' },
  { title: 'November 2025: Arriving in Panama', date: 'November 2025', excerpt: 'First impressions of Bocas del Toro, Panama - exploring viber cafes, cultural authenticity, and what makes a place feel like home.', image: '/assets/images/misc/panama-dive.jpg', link: '/blog/2025/november' },
  { title: 'October 2025: Business in Costa Rica', date: 'October 2025', excerpt: 'On the eve of a one-way flight, reflecting on family, AI consulting with Kyle, and committing to ship real value in Costa Rica.', image: '/assets/images/misc/costa-business.jpg', link: '/blog/2025/october' },
  { title: 'August 2025: Coming Home to Florida', date: 'August 2025', excerpt: "Reverse culture shock and finding home again after a year of global adventures. Reflections on returning to Florida and what 'home' means now.", image: '/assets/images/misc/posttrip.jpg', link: '/blog/2025/august' },
  { title: 'July 2025: Hokkaido, the Northern Gem of Japan', date: 'July 2025', excerpt: 'Hokkaido cuisine, nature, and culture', image: '/assets/images/food/sush.jpg', link: '/blog/2025/july' },
  { title: 'June 2025: Indonesia', date: 'June 2025', excerpt: 'From surfing worldclass waves to temple-hopping in Bali, Indonesia is a whirlwind of ancient culture, amazing wildlife, and adventure.', image: '/assets/images/misc/indoprof.jpg', link: '/blog/2025/june' },
  { title: 'May 2025: Island Hopping in the Philippines', date: 'May 2025', excerpt: 'Turquoise waterfalls, epic snorkeling, crazy surfing, and laid-back beach vibes — the Philippines hits hard in every direction.', image: '/assets/images/misc/canyoneering.jpg', link: '/blog/2025/may' },
  { title: 'April 2025: Motorbiking Vietnam', date: 'April 2025', excerpt: 'Ride with me across terraced rice fields while enjoying traditional Vietnamese cuisine.', image: '/assets/images/misc/droneshotrice.jpg', link: '/blog/2025/april' },
  { title: 'March 2025: Chilling in Cambodia', date: 'March 2025', excerpt: 'From the ancient temples of Angkor Wat to the pristine beaches of Koh Rong, exploring the wonders of Cambodia.', image: '/assets/images/misc/kohsdach.jpg', link: '/blog/2025/march' },
  { title: 'February 2025: Adventures in Laos', date: 'February 2025', excerpt: "Journeying through Laos' traditional villages and beautiful landscapes, discovering the heart of Southeast Asia.", image: '/assets/images/misc/laosfall-2.jpg', link: '/blog/2025/february' },
  { title: 'January 2025: Thailand Discos', date: 'January 2025', excerpt: 'From island parties to serene sunsets, experiencing the allure of Thailand.', image: '/assets/images/misc/fullmoon-2.jpg', link: '/blog/2025/january' },
  { title: 'December 2024: Trekking in Nepal', date: 'December 2024', excerpt: 'Exploring the majestic Himalayas and vibrant streets of Kathmandu. From ancient temples to mountain adventures.', image: '/assets/images/misc/namaste8-2.jpg', link: '/blog/2024/december' },
  { title: 'November 2024: Safaris of East Africa', date: 'November 2024', excerpt: 'From the vast savannas of Tanzania to the perfectious coffee of Rwanda.', image: '/assets/images/misc/serengeti-2.jpg', link: '/blog/2024/november' },
  { title: 'October 2024: Investing in Georgia', date: 'October 2024', excerpt: 'Discovering the rich culture and ancient traditions of Georgia, from the vibrant streets of Tbilisi to the stunning mountains of Gudauri.', image: '/assets/images/misc/blarg-2.jpg', link: '/blog/2024/october' },
  { title: 'September 2024: Connecting in Israel', date: 'September 2024', excerpt: 'The start of my world adventure, from the final days in Florida to the first experiences in Israel.', image: '/assets/images/misc/holyholy.jpg', link: '/blog/2024/september' },
] as const;

// Function to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
