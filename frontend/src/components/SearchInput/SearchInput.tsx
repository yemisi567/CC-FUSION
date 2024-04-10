import * as React from "react";
import { cn } from "../../utils/helpers";
import SearchIcon from "../../utils/Icons/Search";
import Input from "../Input/Input";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** classname for styling container */
  containerClass?: string;
}

export function SearchInput({ containerClass, ...props }: SearchInputProps) {
  return (
    <div
      className={cn(
        "h-auto border-0.2 border-strokedark shadow-active px-16 flex items-center gap-x-8 rounded-r8 has-[:focus-visible]:border-primary",
        containerClass
      )}
    >
      <SearchIcon />
      <Input
        className="border-none shadow-none p-0 placeholder:text-base text-base w-full h-auto !rounded-none"
        {...props}
      />
    </div>
  );
}
