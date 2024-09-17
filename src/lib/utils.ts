import { Timestamp } from "firebase/firestore";
import { format, isThisYear } from "date-fns";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPostDate(createdAt: Timestamp | String) {
  let date: Date;
  let formattedDate;

  if (createdAt instanceof Timestamp) {
    date = createdAt.toDate();
  } else {
    date = new Date(String(createdAt));
  }

  if (isThisYear(date)) {
    // If the date is from the current year, format it as "Jun 18 at 12:13 PM"
    formattedDate = format(date, "MMM d 'at' h:mm aaa");
  } else {
    // If the date is from a different year, format it as "18 Jun 2023"
    formattedDate = format(date, "d MMM yyyy");
  }

  return formattedDate.replace(/am|pm/g, (match) => match.toUpperCase());
}

export function getInitials(name: string) {
  const [firstName, lastName] = name.split(" ");

  if (name.split(" ").length === 1) {
    return name.charAt(0).toUpperCase();
  }

  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
}

export const replaceImageFormat = (url: string, newFormat = "webp") => {
  // Create a URL object to handle query parameters
  const urlObj = new URL(url);

  // Set the new format (replaces if 'fm' already exists)
  urlObj.searchParams.set("fm", newFormat);

  // Return the modified URL as a string
  return urlObj.toString();
};
