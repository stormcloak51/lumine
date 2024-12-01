import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


interface State {
  content: string[]  | null
	// videos: Blob[] | File[] | string[] | null
}

interface Action {
  setContent: (content: State['content']) => void
}

export const useMediaContentStore = create<State & Action>()(
	persist(
		set => ({
			content: null,
			setContent: (content) => set(() => ({ content })),
		}),
		{
			name: 'media-content-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: state => ({ content: state.content }),
		}
	)
)