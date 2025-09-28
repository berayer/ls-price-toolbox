import { createRootRoute, Outlet, Link } from '@tanstack/react-router'

const RootLayout = () => (
  <div className="flex h-svh flex-col">
    <header className="bg-accent drag flex h-12 shrink-0 justify-between">
      <div className="flex items-center gap-4 px-2">
        <Link to="/" className="no-drag [&.active]:text-red-500">
          首页
        </Link>
        <Link to="/about" className="no-drag [&.active]:text-red-500">
          关于
        </Link>
      </div>
      <div>right</div>
    </header>
    <main className="flex-1 overflow-auto">
      <Outlet />
    </main>
  </div>
)

export const Route = createRootRoute({ component: RootLayout })
