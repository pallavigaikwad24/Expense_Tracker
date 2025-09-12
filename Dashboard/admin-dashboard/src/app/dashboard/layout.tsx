// app/dashboard/layout.js
import Link from 'next/link'
import { ReactNode } from 'react'

export default function DashboardLayout({ children } : Readonly<{children: ReactNode}>) {
  return (
    <div className="flex h-screen">
      {/* <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">Admin</h2>
        <nav className="space-y-2">
          <Link href="/dashboard" className="block hover:text-gray-300">Dashboard</Link>
          <Link href="/dashboard/users" className="block hover:text-gray-300">Users</Link>
          <Link href="/dashboard/settings" className="block hover:text-gray-300">Settings</Link>
        </nav>
      </aside> */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
