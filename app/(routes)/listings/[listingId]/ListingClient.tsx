"use client";

import axios from "axios";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/types";

import Container from "@/components/Container";
import { categories } from "@/components/navbar/Categories";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingReservation from "@/components/listings/ListingReservation";

const initialDateRange = {
  endDate: new Date(),
  key: "selection",
  startDate: new Date(),
};

interface ListingClientProps {
  currentUser?: SafeUser | null;
  listing: SafeListing & {
    user: SafeUser;
  };
  reservations?: SafeReservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  currentUser,
  listing,
  reservations = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            currentUser={currentUser}
            id={listing.id}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            title={listing.title}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:gap-10 
              md:grid-cols-7 
              mt-6
            "
          >
            <ListingInfo
              bathroomCount={listing.bathroomCount}
              category={category}
              description={listing.description}
              guestCount={listing.guestCount}
              locationValue={listing.locationValue}
              roomCount={listing.roomCount}
              user={listing.user}
            />
            <div
              className="
                mb-10 
                md:col-span-3
                md:order-last 
                order-first 
              "
            >
              <ListingReservation
                dateRange={dateRange}
                disabled={isLoading}
                disabledDates={disabledDates}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
                price={listing.price}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
