import type { Profile } from '@prisma/client'
import type { Resident, User } from '../prisma/definition'
import create from 'zustand'

interface UseUserStore {
  user: User | null
  read: (payload: { user: User }) => void
  unRead: () => void
  update: {
    profile: (payload: { profile: Profile }) => void
  }
  create: {
    record: (payload: { record: Resident }) => void
  }
}

const useUserStore = create<UseUserStore>((set, get) => ({
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
    record: async ({ record }) => {
      set(({ user }) => ({
        user: {
          ...user!,
          authorized: false,
          records: [...user!.records!, record],
        },
      }))
      const { id } = get().user!
      await fetch(`/api/users/${id}/records/create`, {
        method: 'POST',
        body: JSON.stringify(record),
      })
    },
  },
}))

export default useUserStore
