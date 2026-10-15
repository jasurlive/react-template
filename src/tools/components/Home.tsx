import '../css/home.css'
import Menu, { type MenuItem } from '../shared/Menu'
import { useGetUsers } from '../hooks/GET/useGetUsers'
import { useShortcuts } from '../hooks/LOCAL/useShortcuts'
import { useTheme } from '../hooks/LOCAL/useTheme'

const MENU_ITEMS: MenuItem[] = [
  { label: 'Home', icon: '🏠', href: '/' },
  { label: 'Users', icon: '👤', href: '/users' },
]

export default function Home() {
  const { theme, toggleTheme } = useTheme()
  const { users, loading, error } = useGetUsers()

  useShortcuts({ 'ctrl+j': toggleTheme })

  return (
    <div className="home-container with-menu">
      <Menu items={MENU_ITEMS} />

      <header className="home-menu">
        <h1 className="home-title">my-vite-template</h1>
        <button className="home-toggle" onClick={toggleTheme} title="Toggle theme (Ctrl+J)">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </header>

      <main className="home-content">
        {loading && <p className="home-status">Loading users…</p>}
        {error && <p className="home-status home-error">Couldn't load users: {error}. Check VITE_API_URL in .env.</p>}

        <ul className="home-list">
          {users.map((user) => (
            <li key={user.id} className="home-item">
              <span className="home-name">{user.name}</span>
              <span className="home-email">{user.email}</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}