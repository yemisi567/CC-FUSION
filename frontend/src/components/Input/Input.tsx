import React from "react";
import { cn } from "../../utils/helpers";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text */
  label?: string;
  /** Check if the input has error */
  hasError?: boolean;
  /** Displays error message when input has error */
  errorText?: string;
  /** Extra optional classname */
  name?: string;
  /** Determine if component should be hidden */
  hidden?: boolean;
  /** Is field required, this will display a "*" text beside the label" */
  isRequired?: boolean;
  /*additional */
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hasError,
      name,
      errorText,
      hidden,
      isRequired,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div hidden={hidden}>
        <div>
          {label && (
            <label
              htmlFor={name}
              className="block text-black text-sm font-medium mb-2"
            >
              {label}
            </label>
          )}
          <input
            className={cn(
              "w-full px-3 py-2 h-[5.6rem] border text-base border-strokelight rounded-[8px] focus:outline-none placeholder:italic placeholder:text-gray placeholder:text-smm",
              {
                "border border-[red]": hasError,
              },
              className
            )}
            aria-label={label}
            id={name}
            name={name}
            {...props}
            ref={ref}
            placeholder={props.placeholder}
          />
        </div>

        {hasError ? (
          <p className="w-full text-smm py-[2px] font-normal italic text-red-500 rounded-md focus:outline-none">
            {errorText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
