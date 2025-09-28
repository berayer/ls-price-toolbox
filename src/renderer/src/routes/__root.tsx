import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarMenu,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { Home, Command, Info } from 'lucide-react'
import { useAppStore } from '@/stores'

const appMenu = [
  {
    name: '首页',
    icon: <Home />,
    to: '/',
  },
  {
    name: '关于',
    icon: <Info />,
    to: '/about',
  },
]

function AppSidebar() {
  const setAppTitle = useAppStore((state) => state.setTitle)

  function handleRouterChange(menu: (typeof appMenu)[0]) {
    setAppTitle(menu.name)
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="drag">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex-center aspect-square size-8 rounded-lg">
              <Command className="size-4" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarMenu>
        <SidebarGroup>
          {appMenu.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton asChild onClick={() => handleRouterChange(item)}>
                <Link to={item.to} className="[&.active]:bg-sidebar-accent [&.active]:text-shadow-sidebar-foreground">
                  {item.icon}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarMenu>
    </Sidebar>
  )
}

const RootLayout = () => {
  const appTitle = useAppStore((state) => state.title)

  return (
    <SidebarProvider open={false}>
      <AppSidebar />
      <SidebarInset className="flex flex-1 flex-col contain-size">
        <header className="bg-accent drag flex h-10 shrink-0 items-center justify-between">
          <div className="flex items-center gap-4 px-4">
            <span className="text-sm font-bold">{appTitle}</span>
          </div>
          <div>right</div>
        </header>
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export const Route = createRootRoute({ component: RootLayout })
