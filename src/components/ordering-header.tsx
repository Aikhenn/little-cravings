import { Link } from "react-router-dom"
import { formatPrice } from "@/bakes"
import { useOrder } from "@/order-context"
import shoppingBag from "@/assets/icons/shopping-bag.svg"

export function OrderingHeader({
  skipHref,
  skipLabel,
}: {
  skipHref: string
  skipLabel: string
}) {
  const { count, total, notice } = useOrder()
  const cartLabel = count > 0 ? `Cart (${count}) · ${formatPrice(total)}` : "Cart (0)"

  return (
    <header className="border-b border-border bg-background">
      <a
        href={skipHref}
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-40 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
      >
        {skipLabel}
      </a>
      <div className="flex h-[72px] items-center justify-between px-5 md:px-10 xl:h-[90px] xl:px-20">
        <Link to="/" className="font-heading text-[26px] leading-none text-primary sm:text-[32px]">
          little cravings
        </Link>
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 rounded-lg text-[13px] leading-[1.55] text-foreground focus-visible:ring-4 focus-visible:ring-ring focus-visible:outline-none"
        >
          <img src={shoppingBag} alt="" width={20} height={20} />
          {cartLabel}
        </Link>
      </div>
      <p role="status" className="sr-only">
        {notice}
      </p>
    </header>
  )
}
