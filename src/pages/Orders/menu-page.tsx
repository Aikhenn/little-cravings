import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { bakes, formatPrice, menuCategories, type MenuCategoryId } from "@/bakes"
import { Button, buttonVariants } from "@/components/ui/button"
import { OrderProgress } from "@/components/order-progress"
import { useOrder } from "@/order-context"
import { formatOrderDate, formatShortDate, fulfillmentDetail, pickupWindow } from "@/schedule"
import { cn } from "cn"
import calendarDays from "@/assets/icons/calendar-days.svg"
import infoIcon from "@/assets/icons/info.svg"

export function MenuPage() {
  const { lines, total, count, date, fulfillment, addBake, removeOne } = useOrder()
  const [category, setCategory] = useState<MenuCategoryId>("all")

  useEffect(() => {
    document.title = "Choose your bakes · little cravings"
  }, [])

  const visible = category === "all" ? bakes : bakes.filter((bake) => bake.category === category)
  const categoryLabel = menuCategories.find((item) => item.id === category)?.label ?? "All"
  const resultsLabel = `${category === "all" ? "All bakes" : categoryLabel} · ${visible.length === 1 ? "1 item" : `${visible.length} items`}`
  const packLabel = count === 1 ? "1 pack" : `${count} packs`

  return (
    <div className="min-h-svh bg-background text-foreground">
      <main
        id="menu"
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 pt-6 pb-10 md:gap-7 md:px-10 md:pt-8 md:pb-12 xl:px-20 xl:pt-10"
      >
        <OrderProgress current={2} />
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:gap-10">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <h1 className="font-heading text-[32px] leading-[1.18] md:text-[44px]">Choose your bakes</h1>
            <p className="text-sm leading-normal text-muted-foreground">
              Add your favorites, one box at a time.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-4 xl:w-[360px]">
            <img src={calendarDays} alt="" width={20} height={20} />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold">{formatOrderDate(date)}</p>
              <p className="text-xs text-muted-foreground">{fulfillmentDetail(fulfillment)}</p>
            </div>
            <Link to="/" className="text-[13px] font-semibold text-primary underline">
              Change
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:gap-8">
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <div
              role="tablist"
              aria-label="Menu categories"
              className="flex gap-2 overflow-x-auto border-b border-border pb-3"
            >
              {menuCategories.map((item) => {
                const selected = item.id === category
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={cn(
                      "h-11 shrink-0 rounded-lg px-[18px] text-[13px]",
                      selected ? "bg-accent font-semibold text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setCategory(item.id)}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
              <p>{resultsLabel}</p>
              <p className="xl:hidden">
                {packLabel} in cart{count > 0 ? ` · ${formatPrice(total)}` : ""}
              </p>
            </div>

            {visible.length === 0 ? (
              <p className="text-sm text-muted-foreground">No bakes in this category yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-x-3 gap-y-7 md:gap-8 xl:grid-cols-3 xl:gap-x-6">
                {visible.map((bake) => {
                  const quantity = lines.find((line) => line.bake.id === bake.id)?.quantity ?? 0
                  return (
                    <article key={bake.id} className="flex min-w-0 flex-col gap-3">
                      <img
                        src={bake.image}
                        alt={bake.imageAlt}
                        className="h-[170px] w-full rounded-xl object-cover md:h-[218px]"
                      />
                      <div className="flex flex-1 flex-col gap-1.5">
                        <h2 className="font-heading text-[21px] leading-[1.2] break-words">{bake.name}</h2>
                        <p className="text-[13px] leading-[1.45] text-muted-foreground">{bake.notes}</p>
                        <div className="mt-auto flex items-start justify-between gap-3 pt-1">
                          <p className="text-[13px] text-muted-foreground">{bake.detail}</p>
                          <p className="text-sm font-semibold">{formatPrice(bake.price)}</p>
                        </div>
                      </div>
                      {quantity > 0 ? (
                        <div className="flex h-11 items-center justify-between rounded-lg border border-accent bg-accent px-3.5 text-foreground">
                          <button
                            type="button"
                            className="text-[19px] leading-none"
                            aria-label={`Remove one ${bake.name}`}
                            onClick={() => removeOne(bake)}
                          >
                            −
                          </button>
                          <span className="text-sm">{quantity}</span>
                          <button
                            type="button"
                            className="text-[19px] leading-none"
                            aria-label={`Add one ${bake.name}`}
                            onClick={() => addBake(bake)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <Button
                          type="button"
                          className="h-11 w-full rounded-lg border-primary bg-primary text-sm hover:bg-primary/90"
                          onClick={() => addBake(bake)}
                        >
                          Add +<span className="sr-only"> {bake.name}</span>
                        </Button>
                      )}
                    </article>
                  )
                })}
              </div>
            )}

            <p className="flex items-start gap-2.5 text-[11px] leading-normal text-muted-foreground">
              <img src={infoIcon} alt="" width={16} height={16} className="mt-0.5" />
              Our kitchen handles wheat, milk, eggs, soy, and tree nuts.
            </p>
          </div>

          <aside
            id="cart"
            className="flex scroll-mt-6 flex-col gap-3 xl:sticky xl:top-6 xl:w-[272px] xl:shrink-0 xl:gap-5 xl:rounded-2xl xl:border xl:border-border xl:bg-card xl:p-5 xl:shadow-[0px_8px_28px_0px_rgba(107,71,36,0.04)]"
          >
            <div className="hidden flex-col gap-5 xl:flex">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-2xl font-normal">Your cart</h2>
                <p className="text-xs text-muted-foreground">{packLabel}</p>
              </div>
              <p className="text-xs leading-[1.6] text-muted-foreground">
                {fulfillment === "pickup" ? "Pickup" : "Delivery"} · {formatShortDate(date)}
                <br />
                {fulfillment === "pickup" ? pickupWindow : "Local delivery in Portland"}
              </p>
              {lines.map((line) => (
                <div key={line.bake.id} className="flex flex-col gap-[5px]">
                  <p className="text-[13px] font-medium">{line.bake.name}</p>
                  <div className="flex items-start justify-between">
                    <p className="text-xs text-muted-foreground">
                      {line.quantity} × {line.bake.detail}
                    </p>
                    <p className="text-[13px]">{formatPrice(line.bake.price * line.quantity)}</p>
                  </div>
                </div>
              ))}
              <div className="h-px bg-border" />
              <div className="flex items-start justify-between font-semibold">
                <p className="text-sm">Subtotal</p>
                <p className="text-[17px]">{formatPrice(total)}</p>
              </div>
            </div>
            <Link
              to="/cart"
              className={buttonVariants({
                className:
                  "h-[52px] w-full rounded-lg border-[#9a4e35] bg-primary text-sm hover:bg-primary/90",
              })}
            >
              View Cart ({count}) · {formatPrice(total)} →
            </Link>
            <p className="text-center text-[11px] leading-normal text-muted-foreground">
              Your cart stays with you across categories.
            </p>
          </aside>
        </div>
      </main>
    </div>
  )
}
