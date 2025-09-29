import ReactDOM from 'react-dom/client'
import { Loader } from 'lucide-react'

export function createSplashScreen() {
  const splash = document.createElement('div')
  splash.id = 'splash-screen'
  document.body.appendChild(splash)
  ReactDOM.createRoot(document.getElementById('splash-screen')!).render(
    <div className="flex-center fixed inset-0 z-50 scale-100 gap-4 text-2xl opacity-100 transition-all duration-300 ease-in-out">
      <Loader className="animate-spin" /> 正在初始化应用...
    </div>,
  )
}

export function removeSplashScreen() {
  const splash = document.getElementById('splash-screen')
  if (splash) {
    const innerDiv = splash.querySelector('div')
    if (innerDiv) {
      // 同时淡出和缩小
      innerDiv.classList.remove('opacity-100', 'scale-100')
      innerDiv.classList.add('opacity-0', 'scale-90')
    }
    setTimeout(() => splash.remove(), 300)
  }
}
