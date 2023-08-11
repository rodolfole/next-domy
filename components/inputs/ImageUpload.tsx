"use client";

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

const uploadPreset = "airbnb_clone";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      options={{
        maxFiles: 1,
      }}
      uploadPreset={uploadPreset}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              border-2 
              border-dashed 
              border-neutral-300
              cursor-pointer
              flex
              flex-col
              gap-4
              hover:opacity-70
              items-center
              justify-center
              p-20 
              relative
              text-neutral-600
              transition
            "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div
                className="
              absolute h-full inset-0 w-full"
              >
                <Image
                  alt="House"
                  fill
                  src={value}
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
