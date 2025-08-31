import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"

export function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <div className="pt-16 pb-8">
        <main className="min-h-[calc(100vh-8rem)]">
          <div className="mx-auto max-w-7xl px-6">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}