import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { format } from "date-fns";
import {formatInTimeZone } from "date-fns-tz";

export function cn(...args: ClassValue[]) {
    return twMerge(clsx(args));
}

// Function to display user initials in the right format
export const userInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName
        .charAt(0)
        .toUpperCase()}`;
};

// function to captitalize string
export function toTitleCase(str: string) {
    return str?.replace(/\w\S*/g, function (txt) {
        return txt?.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

/** FORMAT MONEY VALUES TO APP CURRENCY DISPLAY  */
export const showMoneyInAppFormat = (amount: string | number) => {
    // Convert amount to valid number
    const convertedAmount = Number(amount);

    // Check if converted value is a valid number
    const isValidNumber =
        !Number.isNaN(convertedAmount) && Number.isFinite(convertedAmount);

    // Format amount to desired style
    if (isValidNumber) {
        return new Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
        })
            .format(convertedAmount)
            .replace("US", "");
    }
    return "--";
};

export const formatDate = (
    isoDate: string,
    doNotConvertToTz = false,
    dateFormat = "MMM d, yyyy",
    timeZone = "America/New_York"
) => {
    if (!Date.parse(isoDate)) return "--";

    if (doNotConvertToTz) {
        if (typeof isoDate === "string" && isoDate?.includes("Z")) {
            return format(
                new Date(isoDate.replace("Z", "")),
                dateFormat || "MMM d, yyyy"
            );
        }
        return format(new Date(isoDate), dateFormat || "MMM d, yyyy");
    }

    // Create a new Date object without adjusting the time
    const date = new Date(isoDate);

    return formatInTimeZone(date, timeZone, dateFormat || "MMM d, yyyy");
};
