"use client";

import { IconType } from "react-icons";

interface CategoryViewProps {
  description: string;
  icon: IconType;
  label: string;
}

const CategoryView: React.FC<CategoryViewProps> = ({
  description,
  icon: Icon,
  label,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-4 items-center">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <div className="font-semibold text-lg">{label}</div>
          <div className="font-light text-neutral-500">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
