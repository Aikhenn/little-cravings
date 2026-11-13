import { Link } from "react-router-dom"
import { formatPrice } from "@/bakes"
import { useOrder } from "@/order-context"
import shoppingBag from "@/assets/icons/shopping-bag.svg"
import Navigation from "./Navigation"

export default function Header() {
  const { count, total, notice } = useOrder()

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex min-h-22.5 w-full max-w-360 flex-wrap items-center justify-between gap-x-8 gap-y-4 px-5 py-4 sm:px-8 md:flex-nowrap md:px-10 xl:px-20">
        <Link to="/" className="order-1 font-heading text-[26px] leading-none text-[#3d2b23] sm:text-[32px]">
          little cravings
        </Link>

        <Navigation />

        <Link
          to="/orders/cart"
          className="order-2 inline-flex items-center gap-2 rounded-lg text-[13px] leading-[1.55] text-foreground focus-visible:ring-4 focus-visible:ring-ring focus-visible:outline-none md:order-3"
        >
          <img src={shoppingBag} alt="" width={20} height={20} />
          Cart ({count}){count > 0 ? ` · ${formatPrice(total)}`: ''}
        </Link>
      </div>

      <p role="status" className="sr-only">
        {notice}
      </p>
    </header>
  )
}
