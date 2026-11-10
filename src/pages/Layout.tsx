import { Outlet, useLocation } from 'react-router-dom'

import Header from '@/components/header/Header'

const Layout = () => {
  const loc = useLocation();

  console.log(loc.pathname)
  console.log("test ran")

  return (
    <main className='overflow-hidden'>
      <Header />
      <Outlet />
    </main>
  )
}

export default Layout