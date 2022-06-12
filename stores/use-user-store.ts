import type { Profile } from '@prisma/client'
import type { Record, User } from '../prisma/definition'
import create from 'zustand'

interface UseUserStore {
  user: User | null
  read: (payload: { user: User }) => void
  unRead: () => void
  update: {
    profile: (payload: { profile: Profile }) => void
  }
  create: {
    record: (payload: { record: Record }) => void
  }
}

const useUserStore = create<UseUserStore>((set) => ({
  user: null,
  profile: null,
  records: null,
  read: ({ user }) => set({ user }),
  unRead: () => set({ user: null }),
  update: {
    profile: ({ profile }) =>
      set(({ user }) => ({ user: { ...user!, profile } })),
  },
  create: {
    record: ({ record }) =>
      set(({ user }) => ({
        user: {
          ...user!,
          authorized: false,
          records: [...user!.records!, record],
        },
      })),
  },
}))

export default useUserStore
