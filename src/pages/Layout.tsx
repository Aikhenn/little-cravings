import { Outlet, useLocation } from 'react-router-dom'

import Header from '@/components/header/Header'

const Layout = () => {
  const loc = useLocation();

  console.log(loc.pathname)
  console.log("test ran")

  return (
    <main className='flex flex-col h-dvh'>
      <div className='shrink-0'>
        <Header />
      </div>

      <div className='min-h-0 flex-1 overflow-y-auto'>
        <Outlet />
      </div>
    </main>
  )
}

export default Layout