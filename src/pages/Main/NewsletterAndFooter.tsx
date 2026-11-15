import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterAndFooter() {
  return (
    <>
      <section className="bg-[#f1e1dd] px-5 py-12 sm:px-8 md:px-10 lg:px-20 lg:py-[52px]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex flex-1 flex-col gap-3">
            <p className="text-[11px] font-semibold leading-normal text-[#9a4e35]">
              LET’S STAY SWEET
            </p>
            <h2 className="font-heading text-[32px] leading-[1.12] text-[#3d2b23] sm:text-[40px]">
              Good things, fresh to your inbox.
            </h2>
            <p className="text-sm leading-[1.55] text-[#78665b]">
              New flavors, oven notes, and first dibs on the good stuff.
            </p>
          </div>
          <form
            className="flex w-full flex-col gap-2.5 lg:w-[460px]"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Your email address"
                aria-label="Your email address"
                className="h-[52px] rounded-[8px] border-[#e3d9cd] bg-[#fbf8f1] px-[14px] text-[13px] placeholder:text-[#78665b]"
              />
              <Button
                type="submit"
                className="h-[52px] rounded-[8px] border border-[#9a4e35] bg-[#9a4e35] px-6 text-sm text-white hover:bg-[#863f2b]"
              >
                Count me in
              </Button>
            </div>
            <p className="text-[10px] leading-[1.55] text-[#78665b]">
              Just the good stuff. Unsubscribe whenever you like.
            </p>
          </form>
        </div>
      </section>

      <footer id="footer" className="bg-[#e8ebdd] px-5 py-10 sm:px-8 md:px-10 lg:px-20 lg:py-12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
          <div className="flex flex-col justify-between gap-8 sm:flex-row">
            <div className="flex flex-col gap-2.5">
              <p className="font-heading text-[32px] leading-normal text-[#3d2b23]">sunday crumb</p>
              <p className="text-[13px] leading-[1.55] text-[#78665b]">
                A little something good, baked from scratch.
              </p>
              <p className="text-xs leading-[1.55] text-[#78665b]">
                1426 SE Division St, Portland, OR 97202
              </p>
            </div>
            <div className="flex gap-12 text-xs leading-[1.55] sm:gap-16">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[#3d2b23]">Come on in</p>
                <Link to="/orders" className="text-[#78665b]">
                  Shop all bakes
                </Link>
                <a href="#story" className="text-[#78665b]">
                  Our story
                </a>
                <a href="https://instagram.com" className="text-[#78665b]">
                  Instagram ↗
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-[#3d2b23]">A helping hand</p>
                <Link to="/orders" className="text-[#78665b]">
                  Delivery & pickup
                </Link>
                <a href="mailto:hello@sundaycrumb.co" className="text-[#78665b]">
                  Allergens & FAQs
                </a>
                <a href="mailto:hello@sundaycrumb.co" className="text-[#78665b]">
                  hello@sundaycrumb.co
                </a>
              </div>
            </div>
          </div>
          <div className="h-px bg-[#e3d9cd]" />
          <div className="flex justify-between gap-4 text-[10px] leading-[1.55] text-[#78665b]">
            <p>© 2026 Sunday Crumb</p>
            <p>Privacy · Terms</p>
          </div>
        </div>
      </footer>
    </>
  )
}
