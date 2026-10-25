import { Link } from "react-router-dom"
import { cn } from "cn"

const steps = [
  { number: 1, label: "Date", href: "/" },
  { number: 2, label: "Menu", href: "/menu" },
  { number: 3, label: "Cart", href: "/cart" },
  { number: 4, label: "Checkout", href: "/checkout" },
] as const

export function OrderProgress({ current }: { current: 1 | 2 | 3 | 4 }) {
  return (
    <ol className="flex items-center gap-2 overflow-x-auto md:gap-5">
      {steps.map((step, index) => {
        const done = step.number < current
        const active = step.number === current
        const marker = (
          <span
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
              active && "bg-primary text-primary-foreground",
              done && "bg-accent text-primary",
              !active && !done && "bg-muted text-primary",
            )}
          >
            {done ? "✓" : step.number}
          </span>
        )
        const label = (
          <span
            className={cn(
              "text-[13px] whitespace-nowrap",
              active ? "font-semibold text-primary" : "text-muted-foreground",
            )}
          >
            {step.label}
          </span>
        )

        return (
          <li key={step.number} className="flex items-center gap-2">
            {index > 0 ? <span className="h-px w-4 bg-border md:w-10" aria-hidden="true" /> : null}
            {done ? (
              <Link
                to={step.href}
                className="flex items-center gap-2 rounded-full focus-visible:ring-4 focus-visible:ring-ring focus-visible:outline-none"
                aria-label={`${step.label}, completed`}
              >
                {marker}
                {label}
              </Link>
            ) : (
              <span className="flex items-center gap-2" aria-current={active ? "step" : undefined}>
                {marker}
                {label}
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}
