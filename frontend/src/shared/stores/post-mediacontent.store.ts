import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { IAsset } from '../config/types/general.types'


interface State {
	media: IAsset[] | null
}

interface Action {
  setMedia: ( media?: State['media']) => void
}

export const useMediaContentStore = create<State & Action>()(
	persist(
		set => ({
			media: null,
			setMedia: (media) => set(() => ({ media })),
		}),
		{
			name: 'media-content-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: state => ({ media: state.media }),
		}
	)
)