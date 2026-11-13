import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"
import heroPhoto from "@/assets/home/hero.png"
import sparklesIcon from "@/assets/icons/sparkles.svg"
import HomeSections from "./HomeSections"

export default function Main() {
  return (
    <div className="bg-[#fbf8f1]">
      <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-8 px-5 py-12 sm:px-8 md:px-10 lg:grid-cols-[minmax(0,492px)_minmax(0,1fr)] lg:gap-10 lg:py-14 xl:gap-[72px] xl:px-20">
        <div className="flex flex-col items-start gap-6 lg:gap-7">
          <p className="text-[11px] font-semibold leading-normal text-[#9a4e35]">
            SMALL BATCHES. SO MUCH HEART.
          </p>
          <h1 className="font-heading text-[clamp(48px,5.35vw,77px)] leading-[1.12] text-[#3d2b23]">
            Good days start with a little crumb.
          </h1>
          <p className="text-[15px] leading-[1.55] text-[#78665b] md:text-[17px]">
            Golden edges, soft middles, and a little moment just for you. Cookies and bakes made
            slowly, shared happily.
          </p>
          <div className="flex flex-wrap items-center gap-x-[18px] gap-y-3">
            <Link
              to="/orders"
              className={cn(
                buttonVariants({ size: "default" }),
                "h-[52px] rounded-[8px] border border-[#9a4e35] bg-[#9a4e35] px-6 text-sm text-white hover:bg-[#863f2b]",
              )}
            >
              Shop now ↗
            </Link>
            <p className="text-xs leading-[1.55] text-[#78665b]">Baked fresh. Never rushed.</p>
          </div>
          <p className="text-xs leading-[1.55] text-[#78665b]">
            <span aria-label="5 out of 5 stars" className="mr-1 text-[#9a4e35]">
              ★★★★★
            </span>
            Loved by 200+ neighborhood sweet tooths
          </p>
        </div>

        <div className="relative min-w-0">
          <img
            src={heroPhoto}
            alt="A plate piled with freshly baked chocolate chip cookies"
            className="h-[320px] w-full rounded-[24px] object-cover sm:h-[420px] lg:h-[480px] xl:h-[544px]"
          />
          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-[#fbf8f1] px-4 py-2.5">
            <img src={sparklesIcon} alt="" width={14} height={14} />
            <p className="text-[11px] leading-[1.55] text-[#3d2b23]">
              Meet your new favorite cookie.
            </p>
          </div>
        </div>
      </section>
      <HomeSections />
    </div>
  )
}
