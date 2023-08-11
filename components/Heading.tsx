"use client";

import { FC } from "react";

interface HeadingProps {
  center?: boolean;
  subtitle?: string;
  title: string;
}

const Heading: FC<HeadingProps> = ({ center, subtitle, title }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="font-bold text-2xl">{title}</div>
      <div className="font-light mt-2 text-neutral-500">{subtitle}</div>
    </div>
  );
};

export default Heading;
