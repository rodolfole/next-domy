"use client";

import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useMemo } from "react";

import useCountries from "@/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/types";

import Button from "../Button";
import HeartButton from "../HeartButton";

interface ListingCardProps {
  actionId?: string;
  actionLabel?: string;
  currentUser?: SafeUser | null;
  data: SafeListing;
  disabled?: boolean;
  onAction?: (id: string) => void;
  reservation?: SafeReservation;
}

const ListingCard: React.FC<ListingCardProps> = ({
  actionId = "",
  actionLabel,
  currentUser,
  data,
  disabled,
  onAction,
  reservation,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            overflow-hidden 
            relative 
            rounded-xl
            w-full 
          "
        >
          <Image
            fill
            className="
              group-hover:scale-110 
              h-full 
              object-cover 
              transition
              w-full 
            "
            src={data.imageSrc}
            alt="Listing"
          />
          <div
            className="
            absolute
            right-3
            top-3
          "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row gap-1 items-center">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel}
            small
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
