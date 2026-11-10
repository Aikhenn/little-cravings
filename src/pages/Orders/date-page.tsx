import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { OrderProgress } from "@/components/order-progress"
import { useOrder } from "@/order-context"
import {
  formatOrderDate,
  fulfillmentDetail,
  isAvailableDate,
  isOpenDay,
  isoDate,
  parseIso,
  pickupWindow,
  shopAddress,
} from "@/schedule"
import { cn } from "cn"
import chevronLeft from "@/assets/icons/chevron-left.svg"
import chevronRight from "@/assets/icons/chevron-right.svg"
import storeIcon from "@/assets/icons/store.svg"
import truckIcon from "@/assets/icons/truck.svg"

const weekdays = ["S", "M", "T", "W", "T", "F", "S"]

export function DatePage() {
  const { date, fulfillment, setDate, setFulfillment } = useOrder()
  const selected = parseIso(date) ?? new Date()
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(selected.getFullYear(), selected.getMonth(), 1),
  )

  useEffect(() => {
    document.title = "When would you like your order? · little cravings"
  }, [])

  const today = new Date()
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastMonth = new Date(today.getFullYear(), today.getMonth() + 6, 1)
  const canGoBack = visibleMonth > currentMonth
  const canGoForward = visibleMonth < lastMonth
  const year = visibleMonth.getFullYear()
  const month = visibleMonth.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: Array<Date | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1)),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const monthLabel = visibleMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <div className="min-h-svh bg-background text-foreground">
      <main
        id="order-setup"
        className="mx-auto flex w-full max-w-360 flex-col gap-6 px-5 pt-6 pb-10 md:gap-8 md:px-10 md:pt-10 md:pb-16 xl:px-52 xl:pt-12"
      >
        <OrderProgress current={1} />
        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-[32px] leading-[1.18] md:text-[44px]">
            When would you like your order?
          </h1>
          <p className="text-sm leading-normal text-muted-foreground">
            Choose your day, then delivery or pickup.
          </p>
        </div>

        <section className="flex flex-col gap-6 md:gap-7 md:rounded-[20px] md:border md:border-border md:bg-card md:p-7 md:shadow-[0px_8px_28px_0px_rgba(107,71,36,0.04)] xl:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:gap-12">
            <div className="rounded-[20px] border border-border bg-card p-4 shadow-[0px_8px_28px_0px_rgba(107,71,36,0.04)] md:flex-1 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none xl:max-w-116">
              <h2 className="text-[15px] font-semibold">Choose a date</h2>
              <div className="mt-5 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <p className="text-[17px] font-semibold">{monthLabel}</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className={cn(
                        "flex size-8 items-center justify-center rounded-lg",
                        canGoBack ? "border border-border" : "opacity-35",
                      )}
                      aria-label="Previous month"
                      disabled={!canGoBack}
                      onClick={() => setVisibleMonth(new Date(year, month - 1, 1))}
                    >
                      <img src={chevronLeft} alt="" width={20} height={20} />
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "flex size-8 items-center justify-center rounded-lg",
                        canGoForward ? "border border-border" : "opacity-35",
                      )}
                      aria-label="Next month"
                      disabled={!canGoForward}
                      onClick={() => setVisibleMonth(new Date(year, month + 1, 1))}
                    >
                      <img src={chevronRight} alt="" width={20} height={20} />
                    </button>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col gap-1.5" role="group" aria-label={monthLabel}>
                  <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-muted-foreground">
                    {weekdays.map((weekday, index) => (
                      <span key={`${weekday}-${index}`} className="min-w-0">
                        {weekday}
                      </span>
                    ))}
                  </div>
                  <div className="grid min-w-0 grid-cols-7 gap-1">
                    {cells.map((day, index) => {
                      if (!day) return <span key={`empty-${index}`} className="h-10 min-w-0 md:h-11" />
                      const iso = isoDate(day)
                      const available = isAvailableDate(iso)
                      const isSelected = iso === date
                      const open = isOpenDay(day)
                      return (
                        <button
                          key={iso}
                          type="button"
                          disabled={!available}
                          aria-pressed={isSelected}
                          aria-label={`${day.toLocaleDateString("en-US", { month: "long", day: "numeric" })}${available ? "" : ", unavailable"}`}
                          className={cn(
                            "flex h-10 min-w-0 w-full flex-col items-center justify-center rounded-lg px-0 text-sm md:h-11",
                            isSelected && "border border-primary bg-accent font-semibold text-primary",
                            !isSelected && available && "bg-muted text-primary",
                            !available && "text-faded",
                          )}
                          onClick={() => setDate(iso)}
                        >
                          {day.getDate()}
                          {available && open && !isSelected ? (
                            <span className="mt-0.5 size-0.75 rounded-full bg-primary" />
                          ) : null}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Available
                  </span>
                  <span>Faded dates unavailable</span>
                </div>
              </div>
            </div>

            <div className="hidden w-px self-stretch bg-border md:block" />

            <div className="flex flex-1 flex-col gap-3">
              <h2 className="text-[15px] font-semibold">How would you like it?</h2>
              <button
                type="button"
                aria-pressed={fulfillment === "delivery"}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4.5 text-left",
                  fulfillment === "delivery" ? "border-primary bg-secondary" : "border-border bg-card",
                )}
                onClick={() => setFulfillment("delivery")}
              >
                <img src={truckIcon} alt="" width={20} height={20} />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">Delivery</span>
                  <span className="mt-1 block text-xs leading-[1.4] text-muted-foreground">
                    Local delivery in Portland
                  </span>
                </span>
                <span
                  className={cn(
                    "flex size-4.5 items-center justify-center rounded-full border text-[11px] leading-none text-white",
                    fulfillment === "delivery" ? "border-primary bg-primary" : "border-border bg-card",
                  )}
                >
                  {fulfillment === "delivery" ? "✓" : ""}
                </span>
              </button>
              <button
                type="button"
                aria-pressed={fulfillment === "pickup"}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4.5 text-left",
                  fulfillment === "pickup" ? "border-primary bg-secondary" : "border-border bg-card",
                )}
                onClick={() => setFulfillment("pickup")}
              >
                <img src={storeIcon} alt="" width={20} height={20} />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">Pickup</span>
                  <span className="mt-1 block text-xs leading-[1.4] text-muted-foreground">
                    Collect from our bakery
                  </span>
                </span>
                <span
                  className={cn(
                    "flex size-4.5 items-center justify-center rounded-full border text-[11px] leading-none text-white",
                    fulfillment === "pickup" ? "border-primary bg-primary" : "border-border bg-card",
                  )}
                >
                  {fulfillment === "pickup" ? "✓" : ""}
                </span>
              </button>
              {fulfillment === "pickup" ? (
                <div className="flex flex-col gap-1.5 pt-1">
                  <p className="text-[13px] font-medium text-primary">
                    {formatOrderDate(date)} · {pickupWindow}
                  </p>
                  <p className="text-xs leading-normal text-muted-foreground">{shopAddress}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div aria-live="polite">
                <p className="text-sm font-semibold">{formatOrderDate(date)}</p>
                <p className="text-xs text-muted-foreground">{fulfillmentDetail(fulfillment)}</p>
              </div>
              <Link
                to="./menu"
                className={buttonVariants({
                  className:
                    "h-13 w-full rounded-lg border-[#9a4e35] bg-primary text-sm hover:bg-primary/90 md:w-50",
                })}
              >
                View Menu →
              </Link>
            </div>
            <p className="text-center text-[11px] text-muted-foreground md:text-right">
              Next: choose your bakes. No details needed yet.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
