import { create } from 'zustand'

type State = {
  title: string
  setTitle: (title: string) => void
}

type Action = {
  setTitle: (title: string) => void
}

export const useAppStore = create<State & Action>((set) => ({
  title: '首页',
  setTitle: (title: string) => set(() => ({ title })),
}))
