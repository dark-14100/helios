import { create } from 'zustand'

export interface SimStore {
  elapsedDays: number
  simSpeed: number
  isPaused: boolean
  selectedPlanet: string | null
  hasStarted: boolean
  isLoading: boolean
  loadingProgress: number
  setHasStarted: (s: boolean) => void
  setIsLoading: (l: boolean) => void
  setLoadingProgress: (p: number) => void
  setSimSpeed: (s: number) => void
  setIsPaused: (p: boolean) => void
  setSelectedPlanet: (name: string | null) => void
  tick: (delta: number) => void
}

export const useSimStore = create<SimStore>((set, get) => ({
  elapsedDays: 0,
  simSpeed: 10, // 10 simulation days pass per real-world second
  isPaused: false,
  selectedPlanet: null,
  hasStarted: false,
  isLoading: true,
  loadingProgress: 0,
  setHasStarted: (s) => set({ hasStarted: s }),
  setIsLoading: (l) => set({ isLoading: l }),
  setLoadingProgress: (p) => set({ loadingProgress: p }),
  setSimSpeed: (s) => set({ simSpeed: s }),
  setIsPaused: (p) => set({ isPaused: p }),
  setSelectedPlanet: (name) => set({ selectedPlanet: name }),
  tick: (delta) => {
    const { isPaused, simSpeed, elapsedDays } = get()
    if (!isPaused) {
      // Scale elapsed days smoothly using tick delta relative to user speed, locked at 0 floor
      set({ elapsedDays: Math.max(0, elapsedDays + delta * simSpeed) })
    }
  },
}))

if (typeof window !== 'undefined') {
  ;(window as any).simStore = useSimStore.getState()
}
