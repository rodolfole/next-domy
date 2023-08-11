"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
  showReset?: boolean;
  subtitle?: string;
  title?: string;
}

const EmptyState: FC<EmptyStateProps> = ({
  showReset,
  subtitle = "Try changing or removing some of your filters.",
  title = "No exact matches",
}) => {
  const router = useRouter();

  return (
    <div
      className="
        flex 
        flex-col 
        gap-2 
        h-[60vh]
        items-center 
        justify-center 
      "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            label="Remove all filters"
            onClick={() => router.push("/")}
            outline
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
