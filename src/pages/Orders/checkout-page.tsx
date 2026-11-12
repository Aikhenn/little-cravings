import { useEffect, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { formatPrice, type OrderLine } from "@/bakes"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { OrderProgress } from "@/components/order-progress"
import { useOrder } from "@/order-context"
import { formatOrderDate, fulfillmentDetail, pickupWindow, shopAddress } from "@/schedule"

type PlacedOrder = {
  lines: OrderLine[]
  total: number
  name: string
  phone: string
  address: string
  date: string
  fulfillment: "pickup" | "delivery"
}

export function CheckoutPage() {
  const { lines, total, count, date, fulfillment, clearOrder, announce } = useOrder()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [nameError, setNameError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [addressError, setAddressError] = useState("")
  const [placed, setPlaced] = useState<PlacedOrder | null>(null)

  useEffect(() => {
    document.title = placed ? "We have your order · little cravings" : "Checkout · little cravings"
  }, [placed])

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextName = name.trim()
    const nextPhone = phone.trim()
    const nextAddress = address.trim()
    const phoneDigits = nextPhone.replace(/\D/g, "")
    const nextNameError = nextName ? "" : "Add your name so we know this order is yours."
    const nextPhoneError =
      phoneDigits.length >= 10 ? "" : "Add your phone number so we can reach you."
    const nextAddressError =
      fulfillment === "pickup" || nextAddress ? "" : "Add the address where we should bring your order."

    setNameError(nextNameError)
    setPhoneError(nextPhoneError)
    setAddressError(nextAddressError)
    if (nextNameError || nextPhoneError || nextAddressError || count === 0) return

    setPlaced({
      lines,
      total,
      name: nextName,
      phone: nextPhone,
      address: nextAddress,
      date,
      fulfillment,
    })
    clearOrder()
    announce(`We have your order for ${nextName}. We will call ${nextPhone}.`)
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <main
        id="checkout"
        className="mx-auto flex w-full max-w-360 flex-col gap-6 px-5 pt-6 pb-10 md:gap-8 md:px-10 md:pt-10 md:pb-16 xl:px-52 xl:pt-12"
      >
        <OrderProgress current={4} />
        {placed ? (
          <PlacedSummary order={placed} />
        ) : count === 0 ? (
          <EmptyCheckout />
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <h1 className="font-heading text-[32px] leading-[1.18] md:text-[44px]">Checkout</h1>
              <p className="text-sm leading-normal text-muted-foreground">
                Check your order, then tell us how to reach you.
              </p>
            </div>

            <section className="flex flex-col gap-4 md:rounded-[20px] md:border md:border-border md:bg-card md:p-7 md:shadow-[0px_8px_28px_0px_rgba(107,71,36,0.04)]">
              <h2 className="font-heading text-2xl">Your order</h2>
              <ul className="flex flex-col gap-4">
                {lines.map((line) => (
                  <li key={line.bake.id} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">
                        {line.quantity} {line.bake.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{line.bake.detail}</p>
                    </div>
                    <p className="text-sm font-semibold">{formatPrice(line.bake.price * line.quantity)}</p>
                  </li>
                ))}
              </ul>
              <div className="h-px bg-border" />
              <div>
                <p className="text-sm font-semibold">{formatOrderDate(date)}</p>
                <p className="text-xs text-muted-foreground">{fulfillmentDetail(fulfillment)}</p>
                {fulfillment === "pickup" ? (
                  <p className="text-xs text-muted-foreground">
                    {pickupWindow} · {shopAddress}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {address.trim()
                      ? `Delivery to ${address.trim()}`
                      : "Add the address below so we know where to bring it."}
                  </p>
                )}
              </div>
              <div className="flex items-start justify-between font-semibold">
                <p className="text-sm">Total</p>
                <p className="text-[17px]">{formatPrice(total)}</p>
              </div>
              <Link to="/cart" className="text-[13px] font-semibold text-primary underline">
                Change your cart
              </Link>
            </section>

            <form className="flex flex-col gap-5" onSubmit={placeOrder} noValidate>
              <div className="flex flex-col gap-2">
                <Label htmlFor="order-name">Your name</Label>
                <Input
                  id="order-name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  aria-invalid={nameError ? true : undefined}
                  aria-describedby={nameError ? "order-name-error" : undefined}
                  onChange={(event) => {
                    setName(event.target.value)
                    if (nameError) setNameError("")
                  }}
                />
                {nameError ? (
                  <p id="order-name-error" className="text-sm text-destructive">
                    {nameError}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="order-phone">Phone number</Label>
                <Input
                  id="order-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  aria-invalid={phoneError ? true : undefined}
                  aria-describedby={phoneError ? "order-phone-error" : undefined}
                  onChange={(event) => {
                    setPhone(event.target.value)
                    if (phoneError) setPhoneError("")
                  }}
                />
                {phoneError ? (
                  <p id="order-phone-error" className="text-sm text-destructive">
                    {phoneError}
                  </p>
                ) : null}
              </div>

              {fulfillment === "delivery" ? (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="order-address">Delivery address</Label>
                  <Input
                    id="order-address"
                    name="address"
                    autoComplete="street-address"
                    value={address}
                    aria-invalid={addressError ? true : undefined}
                    aria-describedby={addressError ? "order-address-error" : undefined}
                    onChange={(event) => {
                      setAddress(event.target.value)
                      if (addressError) setAddressError("")
                    }}
                  />
                  {addressError ? (
                    <p id="order-address-error" className="text-sm text-destructive">
                      {addressError}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <Button
                type="submit"
                className="h-[52px] w-full rounded-lg border-[#9a4e35] bg-primary text-sm hover:bg-primary/90 md:w-[240px]"
              >
                Place order
              </Button>
              <p className="text-[11px] leading-normal text-muted-foreground">
                Nothing is charged on this page. We will call you to confirm.
              </p>
            </form>
          </>
        )}
      </main>
    </div>
  )
}

function EmptyCheckout() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-[32px] leading-[1.18] md:text-[44px]">Your cart is empty</h1>
      <p className="text-sm text-muted-foreground">Add a bake before you place an order.</p>
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
  )
}

function PlacedSummary({ order }: { order: PlacedOrder }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-[32px] leading-[1.18] md:text-[44px]">We have your order</h1>
        <p className="text-sm leading-normal text-muted-foreground">
          Thank you, {order.name}. We will call {order.phone} to confirm. Nothing has been charged.
        </p>
      </div>
      <section className="flex flex-col gap-4 md:rounded-[20px] md:border md:border-border md:bg-card md:p-7">
        <ul className="flex flex-col gap-3">
          {order.lines.map((line) => (
            <li key={line.bake.id} className="flex items-start justify-between gap-4 text-sm">
              <span>
                {line.quantity} {line.bake.name}
              </span>
              <span className="font-semibold">{formatPrice(line.bake.price * line.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="h-px bg-border" />
        <p className="text-sm font-semibold">{formatOrderDate(order.date)}</p>
        <p className="text-xs text-muted-foreground">
          {order.fulfillment === "pickup"
            ? `${fulfillmentDetail(order.fulfillment)} · ${shopAddress}`
            : `Delivery to ${order.address}`}
        </p>
        <div className="flex items-start justify-between font-semibold">
          <p className="text-sm">Total</p>
          <p className="text-[17px]">{formatPrice(order.total)}</p>
        </div>
      </section>
      <Link
        to="/"
        className={buttonVariants({
          className:
            "h-[52px] w-full rounded-lg border-[#9a4e35] bg-primary text-sm hover:bg-primary/90 md:w-[240px]",
        })}
      >
        Start another order
      </Link>
    </div>
  )
}
