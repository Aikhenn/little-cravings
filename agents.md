# Little Cravings

A simple ordering website. Customers should understand how to order on their own, including people who are not comfortable with websites or phones.

## Who it is for

Write every screen for someone who rarely orders online. Assume they will not guess, hover, or look for a hidden menu.

- One obvious next step on each screen.
- Plain words: "Add to order", "Your order", "Place order". Avoid "cart", "checkout", "SKU", and icon-only buttons.
- Large text, high contrast, and tap targets big enough for a thumb.
- Show the item name, photo, and price together.
- Keep the order total visible while they shop.
- Say what just happened: "Added 1 Chocolate Cake. Your order is ₱120."
- Before they place the order, show a short summary: items, quantity, total, and how they will get it.
- Errors in everyday language, next to the thing that needs fixing. Example: "Add your phone number so we can reach you."
- Works on a phone first. Desktop is the same flow, just wider.

## UI

Use shadcn/ui. This repo is already initialized (`components.json`, Tailwind, aliases). The package manager is Yarn.

1. Check `src/components/ui` before adding anything.
2. Install missing pieces with the CLI. Do not hand-write a shadcn component.

   ```bash
   yarn shadcn add button card dialog
   ```

3. Import from `@/components/ui/...`. Icons come from `lucide-react`.
4. Build pages from those components. Do not recreate Button, Card, Dialog, Input, and similar primitives with raw HTML and custom CSS.
5. Use Tailwind when a shadcn component is not enough: page layout, spacing, type size, and one-off styling. Put utilities on the element. Do not add another CSS framework or a new stylesheet for something Tailwind already does.

## Editing installed components

shadcn components in `src/components/ui` are ours. Change them when the default does not fit this audience.

- Prefer a variant or class on the component (`size="lg"`, clearer label) before editing the source.
- Edit `src/components/ui/<name>.tsx` when every use should change, such as a larger default button or stronger focus ring.
- Keep the component's props working. Update every place that uses it if you change them.
- Do not replace an installed component with a new one from scratch.

## New files

When you add a file, follow [`docs/architecture.md`](docs/architecture.md). That document says which folder it belongs in and how pages, shared components, the catalog, and the schedule are split.

## File size

Keep each file around 250 lines, and never past 500. When a file is heading past that, split it into component files. Do not leave the whole screen in `src/App.tsx`.

## Stay on the product

Every change should make ordering easier to understand. If a request is vague, choose the simpler screen: fewer choices, bigger type, and the next action labeled in plain language.

## Decisions already made

- Install with `yarn shadcn add …`, not `npx`. The CLI reads `components.json` and writes into `src/components/ui`.
- Edit after install. Try props first, then change the shared component when the change should apply everywhere.
- This is an ordering page for people who are not technical. Do not invent a menu, prices, or a payment method.
- Shop name, pickup vs delivery, payment, and language are not locked in. Do not guess them. Ask before naming them in the product.
