import { useEffect, useState, type ReactNode } from "react"
import { createContext, useContext } from "react"
import { bakes, formatPrice, orderTotal, type Bake, type OrderLine } from "@/bakes"
import {
  defaultOrderDate,
  isAvailableDate,
  type Fulfillment,
} from "@/schedule"

const storageKey = "little-cravings-order"
const scheduleKey = "little-cravings-schedule"

type Schedule = {
  date: string
  fulfillment: Fulfillment
}

type OrderContextValue = {
  lines: OrderLine[]
  total: number
  count: number
  notice: string
  date: string
  fulfillment: Fulfillment
  addBake: (bake: Bake) => void
  removeOne: (bake: Bake) => void
  removeBake: (bake: Bake) => void
  clearOrder: () => void
  setDate: (date: string) => void
  setFulfillment: (fulfillment: Fulfillment) => void
  announce: (message: string) => void
}

const OrderContext = createContext<OrderContextValue | null>(null)

function storedQuantities() {
  try {
    const raw = sessionStorage.getItem(storageKey)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {}

    const quantities: Record<string, number> = {}
    for (const [id, quantity] of Object.entries(parsed)) {
      if (
        bakes.some((bake) => bake.id === id) &&
        typeof quantity === "number" &&
        Number.isInteger(quantity) &&
        quantity > 0
      ) {
        quantities[id] = quantity
      }
    }
    return quantities
  } catch {
    return {}
  }
}

function storedSchedule(): Schedule {
  const fallback: Schedule = { date: defaultOrderDate(), fulfillment: "pickup" }
  try {
    const raw = sessionStorage.getItem(scheduleKey)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fallback
    const date = "date" in parsed && typeof parsed.date === "string" ? parsed.date : ""
    const fulfillment =
      "fulfillment" in parsed && (parsed.fulfillment === "pickup" || parsed.fulfillment === "delivery")
        ? parsed.fulfillment
        : fallback.fulfillment
    return {
      date: isAvailableDate(date) ? date : fallback.date,
      fulfillment,
    }
  } catch {
    return fallback
  }
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>(storedQuantities)
  const [schedule, setSchedule] = useState<Schedule>(storedSchedule)
  const [notice, setNotice] = useState("")
  const total = orderTotal(quantities)
  const lines = bakes
    .map((bake) => ({ bake, quantity: quantities[bake.id] ?? 0 }))
    .filter((line) => line.quantity > 0)
  const count = lines.reduce((sum, line) => sum + line.quantity, 0)

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(quantities))
  }, [quantities])

  useEffect(() => {
    sessionStorage.setItem(scheduleKey, JSON.stringify(schedule))
  }, [schedule])

  function addBake(bake: Bake) {
    const next = { ...quantities, [bake.id]: (quantities[bake.id] ?? 0) + 1 }
    setQuantities(next)
    setNotice(`Added 1 ${bake.name}. Your cart is ${formatPrice(orderTotal(next))}.`)
  }

  function removeOne(bake: Bake) {
    const current = quantities[bake.id] ?? 0
    if (current <= 0) return
    const next = { ...quantities }
    if (current === 1) delete next[bake.id]
    else next[bake.id] = current - 1
    setQuantities(next)
    setNotice(`Removed 1 ${bake.name}. Your cart is ${formatPrice(orderTotal(next))}.`)
  }

  function removeBake(bake: Bake) {
    if ((quantities[bake.id] ?? 0) <= 0) return
    const next = { ...quantities }
    delete next[bake.id]
    setQuantities(next)
    setNotice(`Removed ${bake.name}. Your cart is ${formatPrice(orderTotal(next))}.`)
  }

  function clearOrder() {
    setQuantities({})
  }

  function setDate(date: string) {
    if (!isAvailableDate(date)) return
    setSchedule((current) => ({ ...current, date }))
  }

  function setFulfillment(fulfillment: Fulfillment) {
    setSchedule((current) => ({ ...current, fulfillment }))
  }

  return (
    <OrderContext.Provider
      value={{
        lines,
        total,
        count,
        notice,
        date: schedule.date,
        fulfillment: schedule.fulfillment,
        addBake,
        removeOne,
        removeBake,
        clearOrder,
        setDate,
        setFulfillment,
        announce: setNotice,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const value = useContext(OrderContext)
  if (!value) throw new Error("useOrder must be used within OrderProvider")
  return value
}
