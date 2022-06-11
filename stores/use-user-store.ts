import { Profile, Resident } from '@prisma/client'
import create from 'zustand'
import { User } from '../prisma/definition'

interface UseUserStore {
  user: User | null
  read: (payload: User) => void
  unRead: () => void
}

const useUserStore = create<UseUserStore>((set) => ({
  user: null,
  read: (payload) => set({ user: payload }),
  unRead: () => set({ user: null }),
}))

export default useUserStore
