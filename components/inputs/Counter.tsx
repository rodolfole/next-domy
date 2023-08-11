"use client";

import { FC, useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  onChange: (value: number) => void;
  subtitle: string;
  title: string;
  value: number;
}

const Counter: FC<CounterProps> = ({ onChange, subtitle, title, value }) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="
            border-[1px]
            border-neutral-400
            cursor-pointer
            flex
            h-10
            hover:opacity-80
            items-center
            justify-center
            rounded-full
            text-neutral-600
            transition
            w-10
          "
        >
          <AiOutlineMinus />
        </div>
        <div
          className="
            font-light 
            text-neutral-600
            text-xl 
          "
        >
          {value}
        </div>
        <div
          onClick={onAdd}
          className="
            border-[1px]
            border-neutral-400
            cursor-pointer
            flex
            h-10
            hover:opacity-80
            items-center
            justify-center
            rounded-full
            text-neutral-600
            transition
            w-10
          "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
