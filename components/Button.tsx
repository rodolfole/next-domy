"use client";

import { FC, MouseEvent } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  disabled?: boolean;
  icon?: IconType;
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  outline?: boolean;
  small?: boolean;
}

const Button: FC<ButtonProps> = ({
  disabled,
  icon: Icon,
  label,
  onClick,
  outline,
  small,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        disabled:cursor-not-allowed
        disabled:opacity-70
        hover:opacity-80
        relative
        rounded-lg
        transition
        w-full
        ${
          outline
            ? "bg-white border-black text-black"
            : "bg-rose-500 border-rose-500 text-white"
        }
        ${
          small
            ? "border-[1px] font-light py-1 text-sm"
            : "border-2 font-semibold py-3 text-md"
        }
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
