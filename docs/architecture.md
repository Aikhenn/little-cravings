# Architecture

Little Cravings is a phone-first ordering site with four steps. The customer chooses a day and how they will get the order, adds bakes, edits the cart, then reviews and places the order. The order lives in the browser. Nothing is charged on the site.

| Path | Screen | Job |
| --- | --- | --- |
| `/` | Date & fulfillment | Choose an open day, then pickup or delivery. |
| `/menu` | Menu | Add bakes. The order total stays visible. |
| `/cart` | Cart | Change quantities or remove bakes. |
| `/checkout` | Checkout | Review the order, leave a name and phone, and place it. |
| anything else | | Send the customer back to `/`. |

`App.tsx` only mounts the order provider and the router. Each step is a page. The ordering header and the step progress are shared.

Open days are Wednesday through Sunday, from today forward. Pickup is 10 am–2 pm at the bakery. Delivery is local in Portland.

## Folders

```
src/
  main.tsx                      mounts the app
  App.tsx                       provider and router only
  index.css                     Tailwind, fonts, and color tokens
  bakes.ts                      catalog, Bake and OrderLine, price helpers
  schedule.ts                   dates, pickup window, and the shop address
  order-context.tsx             OrderProvider and useOrder

  assets/                       photos and icons imported by pages
    brown-butter.jpg
    chocolate-chunk.jpg
    fudge-brownie.jpg
    lemon-sunday.jpg
    mixed-box.jpg
    raspberry-cloud.jpg
    icons/

  pages/
    date-page.tsx
    menu-page.tsx
    cart-page.tsx
    checkout-page.tsx

  components/                   used by more than one page
    ordering-header.tsx
    order-progress.tsx
    ui/                         shadcn only, installed with the CLI
      button.tsx
      card.tsx
      input.tsx
      label.tsx

  lib/
    utils.ts                    cn, required by shadcn

public/                         files the browser loads by URL
  favicon.svg
  icons.svg
```

`components.json` already points `@/lib` at `src/lib` and `@/components/ui` at the shadcn folder.

Static files that are not imported in code stay in `public/`. Photos used by a page or by the catalog stay in `src/assets/`.

## Where a new file goes

- A component used by one page stays in that page file until the file gets long, then moves into that page's folder.
- A component used by two or more pages goes in `src/components/`.
- A shadcn primitive goes in `src/components/ui/` and is added with `yarn shadcn add …`.
- Bake names, prices, photos, and categories go in `src/bakes.ts`.
- The open-day rules, pickup window, and shop address go in `src/schedule.ts`.

Keep each file around 250 lines, and never past 500.

## Order state

`OrderProvider` wraps every route. `useOrder` is the only way to read or change the order.

The provider stores quantities and the chosen day and fulfillment in `sessionStorage`. It builds the lines from the catalog and keeps the total, the pack count, and the "Added 1 …" notice. Adding, removing one, removing a bake, clearing the order, and changing the day or fulfillment go through that hook. Pages do not write to storage themselves.

## Left out on purpose

`src/App.css`, `src/assets/hero.png`, `src/assets/react.svg`, and `src/assets/vite.svg` are leftovers from the Vite template. The app does not import them.

Vite config, TypeScript config, ESLint, and `components.json` stay at the repo root.
