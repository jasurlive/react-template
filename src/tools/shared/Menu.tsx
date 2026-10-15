import { useState, type ReactNode } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import '../css/menu.css'

export type MenuItem = { label: string; icon: ReactNode; href: string }

export default function Menu({ items }: { items: MenuItem[] }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <nav className={`menu ${collapsed ? 'menu-collapsed' : ''}`}>
      <button className="menu-toggle" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>
      {items.map((item) => (
        <a key={item.href} href={item.href} className="menu-item" title={item.label}>
          <span className="menu-icon">{item.icon}</span>
          <span className="menu-label">{item.label}</span>
        </a>
      ))}
    </nav>
  )
}