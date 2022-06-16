import { Account, Gender, Relationship, Session, Ticket } from "@prisma/client";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: string;
  image: string;
  authorized: boolean;
  accounts?: Account;
  sessions?: Session;
  records?: Resident[];
  profile?: Profile;
  ticket?: Ticket[];
}

export interface Profile {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: Gender;
  birthdate: string;
  contact: string;
  updatedAt: string;
  user?: User;
  userId: string;
}

export interface Resident {
  id: string;
  verified: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: Gender;
  birthdate: string;
  birthplace: string;
  address: string;
  occupation: string;
  contact: string;
  homeowner: boolean;
  voter: boolean;
  relationship?: Relationship | null;
  startedAt: string;
  createdAt?: string;
  updatedAt?: string;
  with?: Resident;
  withId: string | null;
  members?: Member[];
  author?: User;
  authorId: string;
}

export interface Member {
  id: string;
  verified: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: Gender;
  birthdate: string;
  birthplace: string;
  address: string;
  occupation: string;
  contact: string;
  homeowner: boolean;
  voter: boolean;
  relationship: Relationship | null;
  startedAt: string;
  createdAt?: string;
  updatedAt?: string;
  with?: Resident;
  withId?: string | null;
  members?: Resident[];
  author?: User;
  authorId: string;
}
