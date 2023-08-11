import { Listing, Reservation, User } from "@prisma/client";

export interface IListingsParams {
  bathroomCount?: number;
  category?: string;
  endDate?: string;
  guestCount?: number;
  locationValue?: string;
  roomCount?: number;
  startDate?: string;
  userId?: string;
}

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
