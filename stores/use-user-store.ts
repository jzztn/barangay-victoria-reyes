import type { Gender, Profile, User } from '@prisma/client'
import type { Record } from '../prisma/definition'
import create from 'zustand'

interface UseUserStore {
  user: User | null
  profile: Profile | null
  records: Record[] | null
  read: (payload: { user: User; profile: Profile; records: Record[] }) => void
  unRead: () => void
  update: {
    user: (payload: { key: 'authorized'; value: boolean }) => void
    profile: (
      payload:
        | { key: 'firstName'; value: string }
        | { key: 'middleName'; value: string }
        | { key: 'lastName'; value: string }
        | { key: 'gender'; value: Gender }
        | { key: 'birthdate'; value: string }
        | { key: 'contact'; value: string }
    ) => void
  }
  create: {
    record: (payload: { record: Record }) => void
  }
}

const useUserStore = create<UseUserStore>((set) => ({
  user: null,
  profile: null,
  records: null,
  read: ({ user, profile, records }) => set({ user, profile, records }),
  unRead: () => set({ user: null, profile: null, records: null }),
  update: {
    user: ({ key, value }) =>
      set(({ user }) => ({ user: { ...user!, [key]: value } })),
    profile: ({ key, value }) =>
      set(({ profile }) => ({ profile: { ...profile!, [key]: value } })),
  },
  create: {
    record: ({ record }) =>
      set(({ user, records }) => ({
        user: { ...user!, authorized: false },
        records: [...records!, record],
      })),
  },
}))

export default useUserStore
