import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap text-sm font-medium tracking-wider uppercase transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--ui-accent)] text-[var(--ui-on-accent)] hover:bg-[var(--ui-accent-hover)] rounded-full",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 rounded-full",
        outline:
          "border border-[var(--ui-border-strong)] bg-transparent text-[var(--ui-text-primary)] hover:bg-[var(--ui-bg-soft)] rounded-full",
        secondary:
          "bg-[var(--ui-bg-soft)] text-[var(--ui-text-primary)] border border-[var(--ui-border-subtle)] hover:bg-[var(--ui-bg-elevated)] rounded-full",
        ghost:
          "hover:bg-[var(--ui-bg-soft)] text-[var(--ui-text-primary)] rounded-full",
        link: "text-[var(--ui-accent)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-12 px-8 py-3",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...(props as any)}
    />
  )
}

export { Button, buttonVariants }
