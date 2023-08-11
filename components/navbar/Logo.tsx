"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      alt="Logo"
      className="hidden md:block cursor-pointer"
      height={100}
      onClick={() => router.push("/")}
      src="/images/logo.png"
      width={100}
    />
  );
};

export default Logo;
