import { useState, type ReactNode } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiFileText,
  FiDatabase,
  FiHelpCircle,
  FiShield,
} from "react-icons/fi";
import "../css/menu.css";

export type MenuItem = {
  label: string;
  icon: ReactNode;
  href: string;
  mobile?: boolean;
};

const MENU_ITEMS: MenuItem[] = [
  { label: "Home", icon: <FiHome />, href: "/", mobile: true },
  { label: "Users", icon: <FiUsers />, href: "/users", mobile: true },
  {
    label: "Analytics",
    icon: <FiBarChart2 />,
    href: "/analytics",
    mobile: true,
  },
  { label: "Reports", icon: <FiFileText />, href: "/reports", mobile: true },
  { label: "Database", icon: <FiDatabase />, href: "/database" },
  { label: "Security", icon: <FiShield />, href: "/security" },
  { label: "Settings", icon: <FiSettings />, href: "/settings", mobile: true },
  { label: "Help", icon: <FiHelpCircle />, href: "/help" },
];

export default function Menu() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <nav
      className={`menu ${collapsed ? "menu-collapsed" : ""}`}
      // onMouseEnter={() => setCollapsed(false)}
      // onMouseLeave={() => setCollapsed(true)}2
    >
      <button
        className="menu-toggle"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle sidebar"
      >
        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>

      {MENU_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`menu-item ${
            item.mobile ? "menu-mobile-visible" : "menu-desktop-only"
          }`}
          title={item.label}
        >
          <span className="menu-icon">{item.icon}</span>
          <span className="menu-label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
