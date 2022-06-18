import type { Profile, Resident, User } from '../prisma/definition'
import create from 'zustand'
<<<<<<< HEAD
import { Ticket } from '@prisma/client'
=======
>>>>>>> 6127e95ce1ac5e790630a33e4622c37de8a308e3

interface UseUserStore {
  user: User | null
  read: (payload: { user: User }) => void
  unRead: () => void
  update: {
    user: (payload: { key: 'authorized'; value: boolean }) => void
    profile: (payload: { profile: Profile }) => void
  }
  create: {
    profile: (payload: { profile: Profile }) => void
    record: (payload: { record: Resident }) => void
<<<<<<< HEAD
    ticket: (payload: { ticket: Ticket }) => void
  }
}

interface UseUserStore {
  user: User | null
  read: (payload: { user: User }) => void
  unRead: () => void
  update: {
    user: (payload: { key: 'authorized'; value: boolean }) => void
    profile: (payload: { profile: Profile }) => void
  }
  create: {
    profile: (payload: { profile: Profile }) => void
    record: (payload: { record: Resident }) => void
    ticket: (payload: { ticket: Ticket }) => void
=======
>>>>>>> 6127e95ce1ac5e790630a33e4622c37de8a308e3
  }
}

const useUserStore = create<UseUserStore>((set, get) => ({
  user: null,
  read: ({ user }) => set({ user }),
  unRead: () => set({ user: null }),
  update: {
    user: ({ key, value }) =>
      set(({ user }) => ({ user: { ...user!, [key]: value } })),
    profile: async ({ profile }) => {
      set(({ user }) => ({ user: { ...user!, profile } }))
      const { id } = get().user!
      await fetch(`/api/users/${id}/profile/update`, {
        method: 'PUT',
        body: JSON.stringify(profile),
      })
    },
  },
  create: {
    profile: async ({ profile }) => {
      set(({ user }) => ({
        user: { ...user!, profile: profile },
      }))
      const { id } = get().user!
      await fetch(`/api/users/${id}/profile/create`, {
        method: 'POST',
        body: JSON.stringify(profile),
      })
    },
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
<<<<<<< HEAD
    },
    ticket: async ({ ticket }) => {
      set(({ user }) => ({
        user: {
          ...user!,
          authorized: false,
          tickets: [...user!.tickets!, ticket],
        },
      }))
      const { id } = get().user!
      await fetch(`/api/users/${id}/ticket/create`, {
        method: 'POST',
        body: JSON.stringify(ticket),
      })
=======
>>>>>>> 6127e95ce1ac5e790630a33e4622c37de8a308e3
    },
  },
}))

export default useUserStore
