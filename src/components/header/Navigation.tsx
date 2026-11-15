import { NavLink } from "react-router-dom"

const Navigation = () => {
  const links = [
    {
      to: "/",
      label: "Home"
    },
    {
      to: "/orders",
      label: "Shop"
    },
    {
      to: "/story",
      label: "Our Story"
    },
    {
      to: "/location",
      label: "Visit Us"
    },
  ]

  return (
    <nav aria-label="Main navigation" className="order-3 basis-full md:order-2 md:basis-auto">
      <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] leading-normal sm:gap-x-8">
        {links.map(({to, label}) => (
          <li>
            <NavLink
              to={to}
              end
              className={({ isActive }) => isActive ? `text-primary font-semibold` : "text-foreground"}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation