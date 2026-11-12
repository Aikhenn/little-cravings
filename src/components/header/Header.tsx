import { Link } from "react-router-dom"
import { formatPrice } from "@/bakes"
import { useOrder } from "@/order-context"
import shoppingBag from "@/assets/icons/shopping-bag.svg"
import Navigation from "./Navigation"

export default function Header() {
  const { count, total, notice } = useOrder()

  return (
    <header className="border-b border-border bg-background">
      <div className="flex h-18 items-center justify-between px-5 md:px-10 xl:h-22.5 xl:px-20">
        <Link to="/" className="font-heading text-[26px] leading-none text-primary sm:text-[32px]">
          little cravings
        </Link>

        <Navigation />

        <Link
          to="/cart"
          className="inline-flex items-center gap-2 rounded-lg text-[13px] leading-[1.55] text-foreground focus-visible:ring-4 focus-visible:ring-ring focus-visible:outline-none"
        >
          <img src={shoppingBag} alt="" width={20} height={20} />
          Cart {count}{count > 0 ? ` · ${formatPrice(total)}`: ''}
        </Link>
      </div>

      <p role="status" className="sr-only">
        {notice}
      </p>
    </header>
  )
}
