import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function customError(response: Response) {
  let errorMessage = "Алдаа гарлаа!"; // fallback text
  try {
    const errorBody = await response.json();
    // include the full error payload or a message inside it
    errorMessage = JSON.stringify(errorBody, null, 2);
  } catch {
    // fallback if response body isn't JSON
    errorMessage = await response.text();
  }
  throw new Error(errorMessage);
}
