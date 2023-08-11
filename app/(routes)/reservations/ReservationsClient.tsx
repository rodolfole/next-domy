"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/types";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";

interface ReservationsClientProps {
  currentUser?: SafeUser | null;
  reservations: SafeReservation[];
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading subtitle="Bookings on your properties" title="Reservations" />
      <div
        className="
          2xl:grid-cols-6
          gap-8
          grid 
          grid-cols-1 
          lg:grid-cols-4
          md:grid-cols-3 
          mt-10
          sm:grid-cols-2 
          xl:grid-cols-5
        "
      >
        {reservations.map((reservation: any) => (
          <ListingCard
            actionId={reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
            data={reservation.listing}
            disabled={deletingId === reservation.id}
            key={reservation.id}
            onAction={onCancel}
            reservation={reservation}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
