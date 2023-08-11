"use client";

import Image from "next/image";

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  currentUser?: SafeUser | null;
  id: string;
  imageSrc: string;
  locationValue: string;
  title: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  currentUser,
  id,
  imageSrc,
  locationValue,
  title,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        subtitle={`${location?.region}, ${location?.label}`}
        title={title}
      />
      <div
        className="
          h-[60vh]
          overflow-hidden 
          relative
          rounded-xl
          w-full
        "
      >
        <Image
          alt="Image"
          className="object-cover w-full"
          fill
          src={imageSrc}
        />
        <div
          className="
            absolute
            right-5
            top-5
          "
        >
          <HeartButton currentUser={currentUser} listingId={id} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
