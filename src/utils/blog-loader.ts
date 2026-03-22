import { BlogPost } from '../types/blog';
import { calculateReadingTime } from '../content/blog-data';

// Simple cache for blog posts
const blogCache = new Map<string, BlogPost[]>();

// Dynamic import function for blog posts
export async function loadBlogPost(year: string, slug: string): Promise<BlogPost | null> {
  try {
    const blogModule = await import(`../content/blog-posts/${year}-${getMonthFromSlug(slug)}.ts`);
    const posts = Object.values(blogModule)[0] as BlogPost[];
    const post = posts.find(p => p.slug === slug);
    
    if (post) {
      // Add reading time calculation
      post.readingTime = calculateReadingTime(post.content);
    }
    
    return post || null;
  } catch (error) {
    console.error(`Failed to load blog post: ${year}/${slug}`, error);
    return null;
  }
}

// Get posts for a specific year/month
export async function loadBlogPosts(year: string, month?: string): Promise<BlogPost[]> {
  try {
    if (month) {
      const cacheKey = `${year}-${month}`;
      
      // Check cache first
      if (blogCache.has(cacheKey)) {
        return blogCache.get(cacheKey)!;
      }
      
      const blogModule = await import(`../content/blog-posts/${year}-${month}.ts`);
      const posts = Object.values(blogModule)[0] as BlogPost[];
      const processedPosts = posts.map(post => ({
        ...post,
        readingTime: calculateReadingTime(post.content)
      }));
      
      // Cache the result
      blogCache.set(cacheKey, processedPosts);
      return processedPosts;
    }
    
    // If no month specified, load all posts for the year
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 
                  'july', 'august', 'september', 'october', 'november', 'december'];
    
    const allPosts: BlogPost[] = [];
    
    for (const month of months) {
      try {
        const blogModule = await import(`../content/blog-posts/${year}-${month}.ts`);
        const posts = Object.values(blogModule)[0] as BlogPost[];
        allPosts.push(...posts);
      } catch {
        // Month file doesn't exist, continue
      }
    }
    
    return allPosts.map(post => ({
      ...post,
      readingTime: calculateReadingTime(post.content)
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
  } catch (error) {
    console.error(`Failed to load blog posts: ${year}/${month}`, error);
    return [];
  }
}

function getMonthFromSlug(slug: string): string {
  // Month names map to themselves
  const months = ['january', 'february', 'march', 'april', 'may', 'june',
                  'july', 'august', 'september', 'october', 'november', 'december'];
  if (months.includes(slug)) {
    return slug;
  }

  // Complete mapping of all individual post slugs to their months
  const slugToMonth: Record<string, string> = {
    // 2024 September
    'tel-aviv-relaxation-culture': 'september',
    'volunteering-trip-ends': 'september',
    'gaza-border-farming': 'september',
    'eggplant-farm-etrogat': 'september',
    'arrival-in-israel': 'september',
    'rome-layover-adventure': 'september',
    'new-york-stopover': 'september',
    'final-day-florida': 'september',
    // 2024 October
    'nairobi-arrival': 'october',
    'dubai-visa-delay': 'october',
    'sharjah-layover': 'october',
    'last-night-tbilisi': 'october',
    'sighnagi-wine-country': 'october',
    'clarity-ultimate-currency': 'october',
    'barber-and-shabbat': 'october',
    'prometheus-cave': 'october',
    'tskaltubo-analysis': 'october',
    'tskaltubo-spa': 'october',
    'batumi-realignment': 'october',
    'sunny-tbilisi': 'october',
    'gudauri-apartment-tour': 'october',
    'arrival-in-georgia': 'october',
    'leaving-israel': 'october',
    'yom-kippur-jerusalem': 'october',
    'chaim-and-selichot': 'october',
    'netanya-family': 'october',
    'october-7th-anniversary': 'october',
    'knesset-visit': 'october',
    'rosh-hashanah-second-day': 'october',
    'rosh-hashanah-first-day': 'october',
    'rosh-hashanah-eve': 'october',
    'iran-missile-attack': 'october',
    // 2024 November
    'nepal-colors-symbols': 'november',
    'africa-reflection-tech': 'november',
    'kathmandu-israelis-hinduism': 'november',
    'first-day-kathmandu': 'november',
    'dubai-intermission': 'november',
    'consumption-reunion': 'november',
    'goodbye-africa': 'november',
    'innocent-artist': 'november',
    'gravity-economics': 'november',
    'adventure-capitalism-kigali': 'november',
    'arriving-rwanda': 'november',
    'train-reflections': 'november',
    'pole-pole-philosophy': 'november',
    'community-reflections': 'november',
    'barefoot-days': 'november',
    'best-day-diani': 'november',
    'africa-backpacking-challenges': 'november',
    'safari-complete': 'november',
    'heading-to-safari': 'november',
    'first-impressions-africa': 'november',
    'nairobi-geopolitics': 'november',
    // 2024 December
    'koh-tao-reflections': 'december',
    'ai-tech-rainy-day': 'december',
    'travel-philosophy': 'december',
    'christmas-koh-tao': 'december',
    'active-koh-tao': 'december',
    'journey-to-koh-tao': 'december',
    'bangkok-shabbat': 'december',
    'bangkok-freedom': 'december',
    'international-landscaper': 'december',
    'arrival-bangkok': 'december',
    'farewell-nepal': 'december',
    'brutal-bus-ride': 'december',
    'cycles-and-emotions': 'december',
    'thorong-la-pass': 'december',
    'annapurna-circuit-complete': 'december',
    // 2025 January
    'nong-khiaw-excursion': 'january',
    'nong-khiaw-preparation': 'january',
    'nong-khiaw-arrival': 'january',
    'luang-prabang-waterfall': 'january',
    'luang-prabang-arrival': 'january',
    'entering-laos': 'january',
    'chiang-rai-four-months': 'january',
    'chiang-rai-bus-journey': 'january',
    'pai-jungle-tubing': 'january',
    'pai-usa-patriotism': 'january',
    'chiang-dao-epic-adventure': 'january',
    'chiang-mai-acupuncture-physics': 'january',
    'chiang-mai-morning-wander': 'january',
    'khao-lak-freedom-thoughts': 'january',
    'khao-lak-muay-thai': 'january',
    'khao-sok-limestone-chemistry': 'january',
    'khao-sok-second-half': 'january',
    'phuket-thai-culture': 'january',
    'phuket-disposable-generation': 'january',
    'koh-pha-ngan-new-year': 'january',
    // 2025 February
    'koh-sdach-paradise': 'february',
    'phnom-penh-first-impressions': 'february',
    'don-det-backpacker-paradise': 'february',
    'farm-life-reflections': 'february',
    'farm-passionfruit-smoothie': 'february',
    'waterfall-adventure-spark-plug': 'february',
    'first-farm-day-website-work': 'february',
    'volunteering-commitment-rural-laos': 'february',
    'battle-asian-bus-ride': 'february',
    'thakhek-motorbike-loop': 'february',
    'barbershop-urban-design': 'february',
    'vientiane-capital-herbal-sauna': 'february',
    'paramotor-sunset-life-sharing': 'february',
    'blue-lagoons-bicycle-adventure': 'february',
    // 2025 March
    'six-month-awards': 'march',
    'buying-motorbike-vietnam': 'march',
    'hanoi-first-impressions': 'march',
    'chengdu-life-spa-experience': 'march',
    'chengdu-national-parks': 'march',
    'chengdu-people-park-apps': 'march',
    'chengdu-pandas-opera': 'march',
    'qingcheng-mountain-daoism': 'march',
    'chengdu-bathhouse-apps': 'march',
    'cambodia-to-chengdu': 'march',
    'siem-reap-inner-machinations': 'march',
    'angkor-ten-temples': 'march',
    'siem-reap-cycling-tour': 'march',
    'apopo-hero-rats': 'march',
    'shabbat-older-travelers': 'march',
    'phnom-penh-purim-toilet-paper': 'march',
    'three-musketeers-lessons': 'march',
    'kampot-pepper-police-fine': 'march',
    'kampot-cute-city-economics': 'march',
    'kampot-arrival-cute-city': 'march',
    'koh-rong-barefoot-routine': 'march',
    'koh-rong-best-day-life': 'march',
    'koh-rong-bioluminescence': 'march',
    // 2025 April
    'da-nang-reunification-day': 'april',
    'selling-motorbike-hoi-an': 'april',
    'hoi-an-tailor-economics': 'april',
    'hai-van-pass-kindness': 'april',
    'ai-blog-summary': 'april',
    'hue-duck-stop-cupping': 'april',
    'motorbike-crash-dog': 'april',
    'seven-months-hanoi': 'april',
    'ha-giang-loop-complete': 'april',
    'sapa-thoughts-future': 'april',
    'sapa-rest-sharing': 'april',
    'turning-25-sapa': 'april',
    'birthday-uf-basketball': 'april',
    'chicken-road-philosophy': 'april',
    'mai-chau-ethnic-diversity': 'april',
    'drone-repair-mission': 'april',
    'pu-luong-drone-disaster': 'april',
    'pu-luong-mountain-crash': 'april',
    // 2025 May
    'siargao-surfing-philippines-critique': 'may',
    'epic-surfing-day-siargao': 'may',
    'port-barton-kayaking-meaningful-calls': 'may',
    'port-barton-8-months-reflection': 'may',
    'el-nido-future-planning-rabbi-mendy': 'may',
    'el-nido-arrival-boat-expedition': 'may',
    'coron-palawan-arrival': 'may',
    'siquijor-healing-island-reflections': 'may',
    'siquijor-arrival-kawasan-falls': 'may',
    'moalboal-exhaustion-hero-journey': 'may',
    'philippines-arrival-spanish-history': 'may',
    'singapore-exploration-city-state': 'may',
    // 2025 June
    'lombok-rinjani-trek-reflection': 'june',
    'manta-rays-lombok-theology': 'june',
    'business-ideas-meaningful-work': 'june',
    'perfectionist-surfer-uluwatu': 'june',
    'balangan-beach-power-waves': 'june',
    'dennis-adventure-capitalist-ubud': 'june',
    'balinese-spa-luwak-coffee': 'june',
    'bali-arrival-hindu-discovery': 'june',
    'last-day-philippines-surfing-metaphors': 'june',
    // 2025 July
    'home-sweet-florida': 'july',
    'la-layover-griffin': 'july',
    'ten-months-complete-sapporo': 'july',
    'art-of-letting-go-otaru': 'july',
    'niseko-money-mastery': 'july',
    'lake-toya-world-reflections': 'july',
    'noboribetsu-onsen-science': 'july',
    'noboribetsu-slow-contemplation': 'july',
    'hadzabe-versus-modern-life': 'july',
    'shiraoi-cash-crisis': 'july',
    'sapporo-arrival-comfort-questioning': 'july',
    'tokyo-toilet-paper-portal': 'july',
    'bali-visa-nightmare': 'july',
    'flores-whale-sharks-indonesia-finale': 'july',
    // 2025 August
    'from-data-collection-to-implementation': 'august',
    'two-weeks-home-st-petersburg': 'august',
    'one-week-back-clearwater': 'august',
    // 2025 October
    'devotion-is-intelligence': 'october',
    'one-week-in-puerto-viejo': 'october',
    'clarity-in-puerto-viejo': 'october',
    'one-way-flight-to-costa-rica': 'october',
    'psyche-and-ai-realizations': 'october',
    'south-florida-reset': 'october',
    // 2025 November
    'explaining-complexity-intelligence': 'november',
    'thanksgiving-reflections-masculinity-vision': 'november',
    'deployment-day': 'november',
    'three-phase-war': 'november',
    'ratzo-vshov-running-and-returning': 'november',
    'arriving-in-bocas-del-toro': 'november',
    // 2025 December
    'el-paredon-surf-town-analysis': 'december',
    'quantum-entanglement-lake-atitlan': 'december',
    'temezcal-at-lake-atitlan': 'december',
    'guatemala-galavanting': 'december',
    'relentless-building': 'december',
    // 2026 January
    'el-tunco-surf-town-analysis': 'january',
    'guatemala-to-el-tunco': 'january',
    // 2026 February
    'santa-teresa-surfing-building-rhythm': 'february',
    // 2026 March
    'paramus-nj-working-hard-head-down': 'march',
  };

  return slugToMonth[slug] || 'january';
}
