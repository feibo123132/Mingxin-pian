import { create } from 'zustand'

type AudioBusState = {
  activeCount: number
  startEffect: () => void
  endEffect: () => void
}

export const useAudioBus = create<AudioBusState>((set, get) => ({
  activeCount: 0,
  startEffect: () => set({ activeCount: get().activeCount + 1 }),
  endEffect: () => {
    const n = get().activeCount - 1
    set({ activeCount: n < 0 ? 0 : n })
  },
}))

