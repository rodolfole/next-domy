"use client";

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  dateRange: Range;
  disabled?: boolean;
  disabledDates: Date[];
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  price: number;
  totalPrice: number;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  dateRange,
  disabled,
  disabledDates,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
}) => {
  return (
    <div
      className="
        border-[1px]
        overflow-hidden
        rounded-xl 
      bg-white 
      border-neutral-200 
      "
    >
      <div
        className="
      flex flex-row gap-1 items-center p-4"
      >
        <div className="font-semibold text-2xl">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
        value={dateRange}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div
        className="
          flex 
          flex-row 
          font-semibold
          items-center 
          justify-between
          p-4 
          text-lg
        "
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
