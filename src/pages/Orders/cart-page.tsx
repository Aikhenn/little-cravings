import { useEffect } from "react"
import { Link } from "react-router-dom"
import { formatPrice } from "@/bakes"
import { Button, buttonVariants } from "@/components/ui/button"
import { OrderProgress } from "@/components/order-progress"
import { useOrder } from "@/order-context"
import { formatOrderDate, fulfillmentDetail } from "@/schedule"

export function CartPage() {
  const { lines, total, count, date, fulfillment, addBake, removeOne, removeBake } = useOrder()
  const packLabel = count === 1 ? "1 pack" : `${count} packs`

  useEffect(() => {
    document.title = "Your cart · little cravings"
  }, [])

  return (
    <div className="min-h-svh bg-background text-foreground">
      <main
        id="cart"
        className="mx-auto flex w-full max-w-360 flex-col gap-6 px-5 pt-6 pb-10 md:gap-8 md:px-10 md:pt-10 md:pb-16 xl:px-52 xl:pt-12"
      >
        <OrderProgress current={3} />
        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-[32px] leading-[1.18] md:text-[44px]">Your cart</h1>
          <p className="text-sm leading-normal text-muted-foreground">
            {count === 0
              ? "Nothing is in your cart yet."
              : "Change how many you want, or remove a bake."}
          </p>
        </div>

        {count === 0 ? (
          <div className="flex flex-col gap-4">
            <Link
              to="/menu"
              className={buttonVariants({
                className:
                  "h-[52px] w-full rounded-lg border-[#9a4e35] bg-primary text-sm hover:bg-primary/90 md:w-[240px]",
              })}
            >
              Choose your bakes
            </Link>
          </div>
        ) : (
          <section className="flex flex-col gap-6 md:rounded-[20px] md:border md:border-border md:bg-card md:p-7 md:shadow-[0px_8px_28px_0px_rgba(107,71,36,0.04)]">
            <ul className="flex flex-col gap-6">
              {lines.map((line) => (
                <li key={line.bake.id} className="flex flex-col gap-4 border-b border-border pb-6 last:border-b-0 last:pb-0 md:flex-row md:items-center">
                  <img
                    src={line.bake.image}
                    alt={line.bake.imageAlt}
                    className="h-28 w-full rounded-xl object-cover md:h-24 md:w-24 md:shrink-0"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <h2 className="font-heading text-[21px] leading-[1.2]">{line.bake.name}</h2>
                    <p className="text-[13px] text-muted-foreground">{line.bake.detail}</p>
                    <p className="text-sm font-semibold">{formatPrice(line.bake.price)} each</p>
                  </div>
                  <div className="flex flex-col gap-3 md:items-end">
                    <div className="flex h-12 items-center justify-between rounded-lg border border-accent bg-accent px-3 text-foreground md:w-36">
                      <button
                        type="button"
                        className="flex size-11 items-center justify-center text-[19px] leading-none"
                        aria-label={`Remove one ${line.bake.name}`}
                        onClick={() => removeOne(line.bake)}
                      >
                        −
                      </button>
                      <span className="text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        className="flex size-11 items-center justify-center text-[19px] leading-none"
                        aria-label={`Add one ${line.bake.name}`}
                        onClick={() => addBake(line.bake)}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-semibold">{formatPrice(line.bake.price * line.quantity)}</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 w-full text-sm md:w-36"
                      aria-label={`Remove ${line.bake.name}`}
                      onClick={() => removeBake(line.bake)}
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">{formatOrderDate(date)}</p>
              <p className="text-xs text-muted-foreground">{fulfillmentDetail(fulfillment)}</p>
              <p className="text-xs text-muted-foreground">{packLabel}</p>
            </div>

            <div className="flex items-start justify-between font-semibold">
              <p className="text-sm">Total</p>
              <p className="text-[17px]">{formatPrice(total)}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to="/checkout"
                className={buttonVariants({
                  className:
                    "h-[52px] w-full rounded-lg border-[#9a4e35] bg-primary text-sm hover:bg-primary/90 md:w-[240px]",
                })}
              >
                Checkout · {formatPrice(total)} →
              </Link>
              <Link to="/menu" className="text-[13px] font-semibold text-primary underline">
                Choose more bakes
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
