import { create, type StateCreator } from 'zustand'

export type AuthState = {
  isAuthed: boolean
  token?: string
  setAuthed: (isAuthed: boolean) => void
  setToken: (token?: string) => void
  reset: () => void
}

const creator: StateCreator<AuthState> = (set) => ({
  isAuthed: false,
  token: undefined,
  setAuthed: (isAuthed: boolean) => set({ isAuthed }),
  setToken: (token?: string) => set({ token }),
  reset: () => set({ isAuthed: false, token: undefined }),
})

export const useAuthStore = create<AuthState>()(creator)
