export type Fulfillment = "pickup" | "delivery"

export const pickupWindow = "10 am–2 pm"
export const shopAddress = "1426 SE Division St, Portland, OR 97202"

export function isoDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${date.getFullYear()}-${month}-${day}`
}

export function parseIso(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2]) - 1
  const day = Number(match[3])
  const date = new Date(year, month, day)
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) return null
  return date
}

export function isOpenDay(date: Date) {
  const day = date.getDay()
  return day === 0 || day >= 3
}

export function isAvailableDate(iso: string, today = new Date()) {
  const date = parseIso(iso)
  if (!date) return false
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return isOpenDay(date) && date >= startToday
}

export function defaultOrderDate(today = new Date()) {
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  for (let i = 0; i < 21; i += 1) {
    if (isOpenDay(date)) return isoDate(date)
    date.setDate(date.getDate() + 1)
  }
  return isoDate(date)
}

export function formatOrderDate(iso: string) {
  const date = parseIso(iso)
  if (!date) return iso
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
}

export function formatShortDate(iso: string) {
  const date = parseIso(iso)
  if (!date) return iso
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

export function fulfillmentDetail(fulfillment: Fulfillment) {
  return fulfillment === "pickup" ? `Pickup · ${pickupWindow}` : "Delivery"
}
