"use client";

import Image from "next/image";
import { FC } from "react";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      alt="Avatar"
      className="rounded-full"
      height="30"
      src={src || "/images/placeholder.jpg"}
      width="30"
    />
  );
};

export default Avatar;
