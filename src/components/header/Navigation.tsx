import { NavLink } from 'react-router-dom'

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
    <nav>
      <ul className='flex list-none gap-12'>
        {links.map(({to, label}) => (
          <li>
            <NavLink
              to={to}
              className={({ isActive }) => isActive ? `text-primary/90 font-bold` : ""}
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