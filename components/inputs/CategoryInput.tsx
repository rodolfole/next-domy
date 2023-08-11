"use client";

import { FC } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  onClick: (value: string) => void;
  selected?: boolean;
}

const CategoryBox: FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        border-2
        ${selected ? "border-black" : "border-neutral-200"}
        cursor-pointer
        flex
        flex-col
        gap-3
        hover:border-black
        p-4
        rounded-xl
        transition
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryBox;
