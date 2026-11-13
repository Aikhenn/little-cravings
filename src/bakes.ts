import brownButterPhoto from "@/assets/home/brown-butter.png"
import chocolateChunkPhoto from "@/assets/home/chocolate-chunk.png"
import fudgeBrowniePhoto from "@/assets/home/brownie.png"
import lemonSundayPhoto from "@/assets/home/lemon-sunday.png"
import mixedBoxPhoto from "@/assets/home/mixed-box.png"
import raspberryCloudPhoto from "@/assets/home/raspberry-cloud.png"

export type BakeCategory = "cookies" | "smores" | "brownies" | "other"

export type Bake = {
  id: string
  name: string
  notes: string
  detail: string
  price: number
  category: BakeCategory
  image: string
  imageAlt: string
}

export type OrderLine = {
  bake: Bake
  quantity: number
}

export const menuCategories = [
  { id: "all", label: "All" },
  { id: "cookies", label: "Cookies" },
  { id: "smores", label: "S'mores" },
  { id: "brownies", label: "Brownies" },
  { id: "other", label: "Other Baked Goods" },
] as const

export type MenuCategoryId = (typeof menuCategories)[number]["id"]

const mixedBox: Bake = {
  id: "little-mixed-box",
  name: "The Little Mixed Box",
  notes: "Your flavors. Your perfect six.",
  detail: "6 cookies",
  price: 24,
  category: "other",
  image: mixedBoxPhoto,
  imageAlt: "An open bakery box of assorted cookies",
}

const chocolateChunk: Bake = {
  id: "chocolate-chunk",
  name: "Chocolate Chunk",
  notes: "Dark chocolate · flaky sea salt",
  detail: "4 cookies",
  price: 18,
  category: "cookies",
  image: chocolateChunkPhoto,
  imageAlt: "Chocolate chunk cookies on a plate",
}

const raspberryCloud: Bake = {
  id: "raspberry-cloud",
  name: "Raspberry Cloud",
  notes: "Raspberry · white chocolate",
  detail: "4 cookies",
  price: 18,
  category: "cookies",
  image: raspberryCloudPhoto,
  imageAlt: "Raspberry and white chocolate cookies on a plate",
}

const fudgeBrownie: Bake = {
  id: "fudge-brownie-duo",
  name: "Fudge Brownie Duo",
  notes: "Two rich, deeply chocolatey squares",
  detail: "2 brownies",
  price: 8,
  category: "brownies",
  image: fudgeBrowniePhoto,
  imageAlt: "Two squares of chocolate brownie",
}

const lemonSunday: Bake = {
  id: "lemon-sunday",
  name: "Lemon Sunday",
  notes: "Lemon zest · buttery shortbread",
  detail: "4 cookies",
  price: 16,
  category: "cookies",
  image: lemonSundayPhoto,
  imageAlt: "Lemon cookies with glaze and zest on a plate",
}

const brownButter: Bake = {
  id: "brown-butter-bliss",
  name: "Brown Butter Bliss",
  notes: "Toasty butter · caramel notes",
  detail: "4 cookies",
  price: 18,
  category: "cookies",
  image: brownButterPhoto,
  imageAlt: "A plate of golden brown butter cookies",
}

export const bakes = [
  mixedBox,
  chocolateChunk,
  raspberryCloud,
  fudgeBrownie,
  lemonSunday,
  brownButter,
]

export function formatPrice(amount: number) {
  return `$${amount}`
}

export function orderTotal(quantities: Record<string, number>) {
  return bakes.reduce((sum, bake) => sum + bake.price * (quantities[bake.id] ?? 0), 0)
}
