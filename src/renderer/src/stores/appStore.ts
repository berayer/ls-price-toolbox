import { create } from 'zustand'

type State = {
  title: string
  colors: SQLITE.Color[]
  mats: SQLITE.Mat[]
  priceTypes: SQLITE.PriceType[]
  init: boolean
}

type Action = {
  setTitle: (title: string) => void
}

export const useAppStore = create<State & Action>((set) => ({
  title: '首页',
  colors: [],
  mats: [],
  priceTypes: [],
  init: false,
  setTitle: (title: string) => set(() => ({ title })),
}))
