import React from "react";
import { cn } from "../../utils/helpers";

export interface AvatarProps {
  /** Src of image avatar */
  src?: string;
  /* default label without images */
  label?: string;
  /** describes the image */
  alt?: string;
  /** Function to call when avatar is clicked */
  onClick?: () => void;
  /** Extra optional classname */
  className?: string;
}

export default function Avatar({
  src,
  label,
  alt,
  onClick,
  className,
}: AvatarProps) {
  return (
    <button
      className={cn(
        "outline-none bg-white items-center cursor-pointer w-[3.2rem] h-[3.2rem] rounded-full border border-primary",
        className
      )}
      onClick={onClick}
      aria-label="avatar"
    >
      {src ? (
        <img
          className="w-full h-full rounded-full object-contain"
          src={src}
          alt={alt}
        />
      ) : (
        <span className="text-[1.28rem] font-normal leading-none" role="presentation">
          {label}
        </span>
      )}
    </button>
  );
}
