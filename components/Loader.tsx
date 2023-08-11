"use client";

import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="
      flex 
      flex-col 
      h-[70vh]
      items-center 
      justify-center 
    "
    >
      <PuffLoader color="red" size={100} />
    </div>
  );
};

export default Loader;
