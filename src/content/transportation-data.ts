export interface TransportInfo {
  country: string;
  description: string;
  score: number;
  currencyRate: string;
  languages: string[];
  flag?: string;
}

export const transportationData: TransportInfo[] = [
  {
    country: "China",
    description: "High speed trains with no physical tickets, cheap domestic flights, metro to every part of the city. It does not get better than this. Enough said.",
    score: 9.2,
    currencyRate: "10 USD ≈ 70 CNY (Chinese Yuan)",
    languages: ["Mandarin"]
  },
  {
    country: "Georgia",
    description: "In Tbilisi, a scenic cable car ride runs from Rike Park to the Narikala Fortress. The bus system in Tbilisi is efficient, with dedicated lanes and easy mobile payments. Buses cost 1 GEL (about 37 cents) and even have USB-C charging capabilities. Trains connect Tbilisi to Batumi, and car rentals are available for exploring smaller cities.",
    score: 8.8,
    currencyRate: "10 USD ≈ 27 GEL (Georgian Lari)",
    languages: ["Georgian", "Russian", "English"]
  },
  {
    country: "Cambodia",
    description: "Cambodia has a very robust transportation system. Grab, the ride sharing app, is available in major cities. Many private companies offer competitive prices to all major cities. There is also a full ferry system on the islands to get you around. There are plenty of options and easy to navigate.",
    score: 8.3,
    currencyRate: "10 USD ≈ 40,000 KHR (Cambodian Riel)",
    languages: ["Khmer"]
  },
  {
    country: "Thailand",
    description: "Since Thailand is a tourist playground, there is robust transportation infrastructure. You can either book transportation through 12Go App or any hotel/hostel. Transportation ranges from high-speed ferries to islands to 10-person shuttles. The public transport is not widely used; it is mostly tourist-specific transportation infrastructure.",
    score: 8.2,
    currencyRate: "10 USD ≈ 345 THB (Thai Baht)",
    languages: ["Thai", "English", "Russian"]
  },
  {
    country: "Israel",
    description: "Israel has robust public transport. Trains connect the airport to major cities, and the Jerusalem Light Rail provides local service. A Rav Kav card is required for public transit. For ride-hailing, Gett is an alternative to Uber, and the Moovit app helps with navigation. Buses are extensive but Google Maps sometimes lacks accurate timing.",
    score: 7.8,
    currencyRate: "10 USD ≈ 38 ILS (Israeli New Shekel)",
    languages: ["Hebrew", "English", "French", "Russian"]
  },
  {
    country: "Philippines",
    description: "There are many ferries to take you between the islands in Philippines. Grab is available in major cities but tricycles are the main mode of transport to get around. Local buses are cheap but crowded.",
    score: 7.7,
    currencyRate: "10 USD ≈ 600 PHP (Philippine Peso)",
    languages: ["Filipino", "English"]
  },
  {
    country: "Vietnam",
    description: "I cannot comment too much on the Vietnamese transportation infrastructure due to riding my motorbike for a month. If you ride a motorbike there are so many bike mechanic shops and gas stations, even in the most rural parts of the country. The country is very long and requires lengthy sleeper buses to get from location to location. A rail system does exist between North, central and south Vietnam but it is very time consuming as well.",
    score: 7.5,
    currencyRate: "10 USD ≈ 250,000 VND (Vietnamese Dong)",
    languages: ["Vietnamese"]
  },
  {
    country: "Laos",
    description: "Laos has built the brand new Lao-China Railway, connecting the major cities. This is a huge advantage to travel quickly and nicely. The local buses in the smaller villages are very cheap and accessible. Overall, Lao transport is solid, but nothing flashy.",
    score: 7.1,
    currencyRate: "10 USD ≈ 200,000 LAK (Lao Kip)",
    languages: ["Lao"]
  },
  {
    country: "UAE",
    description: "Dubai is easy to get around. You can hop in a taxi or Uber anywhere. There is also a metro system that requires a distinct metro card, but it takes a long time.",
    score: 6.9,
    currencyRate: "10 USD ≈ 37 AED (UAE Dirham)",
    languages: ["Arabic", "English", "Russian", "Chinese"]
  },
  {
    country: "Indonesia",
    description: "Grab works sometimes in the major areas of Bali. There are many ferries to shuttle you between islands. Some private companies are expensive, or opt to take the public boat. More remote islands require private taxis which are expensive.",
    score: 6.7,
    currencyRate: "10 USD ≈ 160,000 IDR (Indonesian Rupiah)",
    languages: ["Balinese", "Sasak", "Indonesian"]
  },
  {
    country: "Rwanda",
    description: "In Kigali, there are thousands of motorcycle taxis. You can get one wherever on the side of the street. A ride for ten minutes costs 75 cents. There is a bus system but it is not extensive. The city is layered with hills so getting around on the motorcycles is quick, easy, and efficient.",
    score: 6.7,
    currencyRate: "10 USD ≈ 13,500 RWF (Rwandan Francs)",
    languages: ["Kinyarwanda", "French", "English", "Swahili"]
  },
  {
    country: "Kenya",
    description: "Uber is the main mode of transport in Kenya. A 45-minute Uber ride can cost less than 10 USD. You can also order a motorcycle for a cheaper, quicker option. Trains connect Nairobi to Mombasa, and buses travel to Tanzania and Uganda. Matatus, privately-owned minibuses, operate on set routes but don't follow strict schedules.",
    score: 6.2,
    currencyRate: "10 USD ≈ 1,300 KES (Kenyan Shilling)",
    languages: ["Swahili", "English"]
  },
  {
    country: "Nepal",
    description: "Kathmandu is a small city with tight streets. There are often traffic jams due to motorbikes and cars whizzing around. There are not really any street lights or street signs. The only way to get around is via taxi, which you have to hail. There is a ride-share app but I have not tried it.",
    score: 4.9,
    currencyRate: "10 USD ≈ 1350 NPR (Nepalese Rupee)",
    languages: ["Nepali", "Chinese", "Hindi", "English"]
  },
  {
    country: "Tanzania",
    description: "The best way to get around in Tanzania is by taxi or public shuttle. Similar to Kenyan matatus, Tanzania has dala-dalas, which are small, crowded, and unpredictable in schedule.",
    score: 4.1,
    currencyRate: "10 USD ≈ 27,000 TZS (Tanzanian Shilling)",
    languages: ["Swahili", "English"]
  }
];