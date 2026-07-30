import { Backpack } from 'lucide-react'

import ModernPackingChecklist from '@/components/ModernPackingChecklist'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function PackingChecklistPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 sm:py-14">
      <header className="flex flex-col gap-4">
        <Badge variant="secondary" className="w-fit">
          <Backpack />
          Carry-on tested
        </Badge>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Packing
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            The compact list that made it through a year on the road.
          </p>
        </div>
      </header>
      <Separator />
      <ModernPackingChecklist />
    </main>
  )
}
