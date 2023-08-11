"use client";

import useSearchModal from "@/hooks/useSearchModal";
import { BiSearch } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import useCountries from "@/hooks/useCountries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] cursor-pointer hover:shadow-md md:w-auto py-2 rounded-full shadow-sm transition w-full
    "
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div
          className="
            border-x-[1px] 
            flex-1 
            font-semibold 
            hidden 
            px-6 
            sm:block 
            text-center
            text-sm 
          "
        >
          {durationLabel}
        </div>
        <div
          className="
            flex 
            flex-row 
            gap-3
            items-center 
            pl-6 
            pr-2 
            text-gray-600 
            text-sm 
          "
        >
          <div className="hidden sm:block">{guestLabel}</div>
          <div
            className="
              bg-rose-500 
              p-2
              rounded-full
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
