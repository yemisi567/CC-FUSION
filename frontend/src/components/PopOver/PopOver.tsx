import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../utils/helpers";

export interface PopoverContentProps
    extends PopoverPrimitive.PopoverContentProps {
    /** extra classname for styling */
    className?: string;
}

/**
 * Displays rich content in a portal, triggered by a button.
 */
export const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    PopoverContentProps
>(({ className, children, ...props }, forwardedRef) => {
    return (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
                {...props}
                className={cn(
                    "text-black text-sm bg-white h-auto w-auto rounded-r8 flex flex-col gap-y-8 p-8 shadow-dropdown mt-8",
                    className
                )}
                ref={forwardedRef}
            >
                {children}
            </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
    );
});

PopoverContent.displayName = "Popover";

const Popover = PopoverPrimitive.Root;
export { Popover };
export const PopoverTrigger = PopoverPrimitive.Trigger;