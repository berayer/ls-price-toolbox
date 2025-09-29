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
import { removeSplashScreen } from '@/lib/splashScreen'
import { fetchSqlite } from '@/lib/fetchSqlite'
import { Button } from '@/components/ui/button'
import MinimizeIcon from '~icons/qlementine-icons/windows-minimize-16'
import MaximizeIcon from '~icons/qlementine-icons/windows-maximize-16'
import UnmaximizeIcon from '~icons/qlementine-icons/windows-unmaximize-16'
import CloseIcon from '~icons/qlementine-icons/windows-close-16'
import { useEffect, useState } from 'react'

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

function WindowControl() {
  const [isMaximized, setIsMaximized] = useState(false)

  const listener = (_, isMaximize) => {
    setIsMaximized(isMaximize)
  }

  useEffect(() => {
    window.electron.ipcRenderer.on('WIN::MAXIMIZED', listener)

    return () => {
      window.electron.ipcRenderer.removeListener('WIN::MAXIMIZED', listener)
    }
  }, [])

  function windowInvoke(event: 'min' | 'max' | 'close') {
    window.electron.ipcRenderer.send('win:invoke', event)
  }

  return (
    <div className="no-drag flex">
      <Button variant="ghost" className="rounded-none" onClick={() => windowInvoke('min')}>
        <MinimizeIcon />
      </Button>
      <Button variant="ghost" className="rounded-none" onClick={() => windowInvoke('max')}>
        {isMaximized ? <UnmaximizeIcon /> : <MaximizeIcon />}
      </Button>
      <Button variant="ghost" className="hover:bg-destructive rounded-none" onClick={() => windowInvoke('close')}>
        <CloseIcon />
      </Button>
    </div>
  )
}

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
        <header className="drag flex h-10 shrink-0 items-center justify-between">
          <div className="flex items-center gap-4 px-4">
            <span className="text-sm font-bold">{appTitle}</span>
          </div>
          <WindowControl />
        </header>
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
  loader: async () => {
    // 初始化数据
    if (!useAppStore.getState().init) {
      const colors = await fetchSqlite<SQLITE.Color[]>('findAllColor')
      const mats = await fetchSqlite<SQLITE.Mat[]>('findAllMat')
      const priceTypes = await fetchSqlite<SQLITE.PriceType[]>('findAllPriceType')
      useAppStore.setState({ colors, mats, priceTypes, init: true })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // 移除首屏加载动画
      removeSplashScreen()
    }
  },
})
