import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"
import mixedBoxPhoto from "@/assets/home/mixed-box.png"
import chocolateChunkPhoto from "@/assets/home/chocolate-chunk.png"
import raspberryCloudPhoto from "@/assets/home/raspberry-cloud.png"
import kitchenPhoto from "@/assets/home/kitchen.png"
import browniePhoto from "@/assets/home/brownie.png"
import brownButterPhoto from "@/assets/home/brown-butter.png"
import wheatIcon from "@/assets/icons/wheat.svg"
import cookieIcon from "@/assets/icons/cookie.svg"
import packageCheckIcon from "@/assets/icons/package-check.svg"
import NewsletterAndFooter from "./NewsletterAndFooter"

type HomeProduct = {
  image: string
  imageAlt: string
  badge?: string
  name: string
  notes: string
  details: string
  action: string
}

const featuredProducts: HomeProduct[] = [
  {
    image: mixedBoxPhoto,
    imageAlt: "An open box of assorted cookies",
    badge: "MAKE IT YOURS",
    name: "The Little Mixed Box",
    notes: "Your flavors. Your perfect six.",
    details: "6 cookies · $24",
    action: "Build a box ↗",
  },
  {
    image: chocolateChunkPhoto,
    imageAlt: "Chocolate chunk cookies on a plate",
    badge: "BESTSELLER",
    name: "Chocolate Chunk",
    notes: "Dark chocolate · flaky sea salt",
    details: "4 cookies · $18",
    action: "Choose a box ↗",
  },
  {
    image: raspberryCloudPhoto,
    imageAlt: "Raspberry and white chocolate cookies on a plate",
    badge: "A LITTLE FRUITY",
    name: "Raspberry Cloud",
    notes: "Raspberry · white chocolate",
    details: "4 cookies · $18",
    action: "Choose a box ↗",
  },
]

const favoriteProducts: HomeProduct[] = [
  featuredProducts[1],
  {
    image: browniePhoto,
    imageAlt: "Two rich chocolate brownie squares",
    name: "Fudge Brownie Duo",
    notes: "Two rich, deeply chocolatey squares",
    details: "2 brownies · $8",
    action: "View bake ↗",
  },
  {
    image: brownButterPhoto,
    imageAlt: "Golden brown butter cookies on a plate",
    name: "Brown Butter Bliss",
    notes: "Toasty butter · caramel notes",
    details: "4 cookies · $18",
    action: "Choose a box ↗",
  },
]

function ProductCard({ product }: { product: HomeProduct }) {
  return (
    <article className="min-w-0 flex-1">
      <Link to="/orders" className="group block rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">
        <div className="relative">
          <img
            src={product.image}
            alt={product.imageAlt}
            className="h-[220px] w-full rounded-xl object-cover sm:h-[260px] lg:h-[300px]"
          />
          {product.badge ? (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-[#fbf8f1] px-2.5 py-1.5 text-[8px] font-semibold leading-none text-[#3d2b23]">
              {product.badge}
            </span>
          ) : null}
        </div>
        <div className="mt-3 flex flex-col gap-[5px]">
          <h3 className="font-heading text-[21px] leading-[1.2] text-[#3d2b23] sm:text-[25px]">
            {product.name}
          </h3>
          <p className="text-[13px] leading-[1.55] text-[#78665b]">{product.notes}</p>
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-1">
            <p className="text-sm font-semibold leading-[1.55] text-[#3d2b23]">{product.details}</p>
            <span className="text-[13px] font-semibold leading-[1.55] text-[#9a4e35]">
              {product.action}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

function ProductCollection({ products }: { products: HomeProduct[] }) {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      {products.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  )
}

export default function HomeSections() {
  return (
    <>
      <section className="border-y border-[#e3d9cd] px-5 py-6 sm:px-8 md:px-10 lg:px-[120px] lg:py-7">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          {[
            { icon: wheatIcon, label: "Real butter. Good ingredients." },
            { icon: cookieIcon, label: "Handmade in small batches" },
            { icon: packageCheckIcon, label: "Local delivery & cozy pickups" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <img src={icon} alt="" width={20} height={20} />
              <p className="text-xs leading-[1.55] text-[#3d2b23]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-7 px-5 py-12 sm:px-8 md:px-10 lg:px-20 lg:py-[72px]">
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-semibold leading-normal text-[#9a4e35]">FRESH FROM OUR OVEN</p>
          <h2 className="font-heading text-[34px] leading-[1.12] text-[#3d2b23] sm:text-[44px]">
            A little something for everyone.
          </h2>
          <p className="text-[15px] leading-[1.55] text-[#78665b]">
            For your coffee break, your favorite person, or absolutely no reason.
          </p>
        </div>
        <ProductCollection products={featuredProducts} />
      </section>

      <section
        id="story"
        className="bg-[#f3e3d8] px-5 py-12 sm:px-8 md:px-10 lg:px-20 lg:py-16"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-8 lg:flex-row lg:gap-[88px]">
          <img
            src={kitchenPhoto}
            alt="Hands preparing cookie dough in a sunlit bakery kitchen"
            className="h-[300px] w-full rounded-2xl object-cover sm:h-[360px] lg:h-[420px] lg:w-[46%]"
          />
          <div className="flex flex-col items-start gap-5">
            <p className="text-[11px] font-semibold leading-normal text-[#9a4e35]">
              FROM OUR KITCHEN, WITH LOVE
            </p>
            <h2 className="font-heading text-[36px] leading-[1.12] text-[#3d2b23] sm:text-[46px]">
              Not a factory. A flour-dusted kitchen.
            </h2>
            <p className="text-[15px] leading-[1.55] text-[#78665b]">
              Sunday Crumb started with a well-loved recipe, a tiny Portland kitchen, and the belief
              that the simplest things can make a day feel special.
            </p>
            <p className="text-[15px] leading-[1.55] text-[#78665b]">
              We still brown the butter, scoop every cookie by hand, and bake only what we need. A
              little slower. A whole lot better.
            </p>
            <a href="#footer" className="text-sm font-semibold leading-[1.55] text-[#9a4e35]">
              Meet the baker ↗
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-7 px-5 py-12 sm:px-8 md:px-10 lg:px-20 lg:py-16">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2.5">
            <p className="text-[11px] font-semibold leading-normal text-[#9a4e35]">
              THE ONES YOU COME BACK FOR
            </p>
            <h2 className="font-heading text-[34px] leading-[1.12] text-[#3d2b23] sm:text-[44px]">
              Neighborhood favorites.
            </h2>
          </div>
          <Link
            to="/orders"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-[52px] rounded-[8px] border-[#e3d9cd] bg-[#fbf8f1] px-6 text-sm text-[#3d2b23]",
            )}
          >
            Shop bestsellers ↗
          </Link>
        </div>
        <ProductCollection products={favoriteProducts} />
        <p className="text-center text-xs leading-[1.55] text-[#78665b]">
          A good cookie never goes out of style. Neither does a really fudgy brownie.
        </p>
      </section>

      <section className="bg-[#e8ebdd] px-5 py-12 sm:px-8 md:px-10 lg:px-20 lg:py-14">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
          <h2 className="text-center font-heading text-[32px] leading-[1.12] text-[#3d2b23] sm:text-[40px]">
            From our oven to your happy place.
          </h2>
          <ol className="grid gap-7 md:grid-cols-3 md:gap-10 lg:gap-14">
            {[
              { number: "01", title: "Pick your little joys", text: "A box of favorites or a mix that’s all you." },
              { number: "02", title: "Choose your day", text: "Local delivery or a hello at our bakery." },
              { number: "03", title: "Make a little moment", text: "Put the kettle on. We’ll take care of the rest." },
            ].map((step) => (
              <li key={step.number} className="flex items-start gap-4">
                <span className="font-heading text-[30px] leading-none text-[#9a4e35]">
                  {step.number}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[15px] font-semibold leading-[1.55] text-[#3d2b23]">
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-[1.55] text-[#78665b]">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1000px] flex-col items-center gap-6 px-5 py-14 text-center sm:px-10 lg:px-20 lg:py-[72px]">
        <p className="text-[11px] font-semibold leading-normal text-[#9a4e35]">A FEW HAPPY CRUMBS</p>
        <p className="text-[17px] leading-normal text-[#9a4e35]" aria-label="5 out of 5 stars">
          ★★★★★
        </p>
        <blockquote className="font-heading text-[28px] leading-[1.12] text-[#3d2b23] sm:text-[36px]">
          “The kind of cookie you think about for the rest of the week. We’re officially Sunday
          people.”
        </blockquote>
        <p className="text-xs leading-[1.55] text-[#78665b]">
          Emma R. · Portland neighbor · Verified order
        </p>
      </section>

      <NewsletterAndFooter />
    </>
  )
}
