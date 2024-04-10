import React from "react";
import { cn } from "../../utils/helpers";

interface PromptProps {
  /** Prompt icon */
  icon?: React.ReactNode;
  /** Prompt title */
  title: string;
  /** Prompt description */
  description: React.ReactNode;
  /** Optional style */
  className?: string;
}
export default function Prompt({
  icon,
  title,
  description,
  className,
}: PromptProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="flex justify-center mb-16">{icon}</div>
      <div className="font-semibold text-md mb-10 text-center">{title}</div>
      <div className=" text-sm text-gray text-center">{description}</div>
    </div>
  );
}
