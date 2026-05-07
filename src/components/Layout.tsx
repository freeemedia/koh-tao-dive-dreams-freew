import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
