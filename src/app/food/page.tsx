import Image from 'next/image'

import { CountryFlag } from '@/components/travel-os/CountryFlag'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { foodData } from '@/content/food-data'

export default function FoodPage() {
  const countries = Object.entries(foodData)
  const dishCount = countries.reduce(
    (count, [, dishes]) => count + dishes.length,
    0,
  )

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 sm:py-14">
      <header className="flex flex-col gap-4">
        <Badge variant="secondary" className="w-fit">
          {dishCount} dishes
        </Badge>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Food
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Dishes worth remembering from the route.
          </p>
        </div>
      </header>

      <Separator />

      <div className="flex flex-col gap-12">
        {countries.map(([country, dishes]) => (
          <section
            key={country}
            aria-labelledby={`food-${country}`}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-2">
              <CountryFlag country={country} className="text-lg" />
              <h2 id={`food-${country}`} className="text-2xl font-semibold">
                {country}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {dishes.map((dish) => (
                <Card key={dish.name} className="overflow-hidden py-0">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardDescription>{dish.country}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {dish.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
