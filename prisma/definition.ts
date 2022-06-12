import {
  Account,
  Gender,
  Profile,
  Relationship,
  Resident,
  Session,
} from '@prisma/client'

export interface User {
  id: string
  name: string
  email: string
  emailVerified: string
  image: string
  authorized: boolean
  accounts?: Account
  sessions?: Session
  records?: Record[]
  profile?: Profile
}

export interface Record {
  id: string
  verified: boolean
  firstName: string
  middleName: string
  lastName: string
  gender: Gender
  birthdate: string
  birthplace: string
  address: string
  occupation: string
  contact: string
  homeowner: boolean
  voter: boolean
  relationship: Relationship | null
  startedAt: string
  createdAt?: string
  updatedAt?: string
  with?: Resident
  withId: string | null
  members?: Resident[]
  author?: User
  authorId: string
}
