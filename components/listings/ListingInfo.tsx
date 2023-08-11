"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  bathroomCount: number;
  category:
    | {
        description: string;
        icon: IconType;
        label: string;
      }
    | undefined;
  description: string;
  guestCount: number;
  locationValue: string;
  roomCount: number;
  user: SafeUser;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  bathroomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            flex 
            flex-row 
            font-semibold 
            gap-2
            items-center
            text-xl 
          "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
            flex 
            flex-row 
            font-light
            gap-4 
            items-center 
            text-neutral-500
          "
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          description={category?.description}
          icon={category.icon}
          label={category?.label}
        />
      )}
      <hr />
      <div
        className="
        font-light text-lg text-neutral-500"
      >
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
