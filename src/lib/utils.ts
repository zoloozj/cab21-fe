import { aimags, soums } from "@/components/constant";
import { FilterModel, GridRequest } from "@/sections/types";
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
const soum = (a: string) => soums.find((x) => x.value === a);
const aimag = (a: string) => aimags.find((x) => x.value === a);

export function buildGridRequest(searchParam?: {
  startPlace?: string;
  endPlace?: string;
  startTime?: string;
  // passengerSeats?: string;
}): GridRequest {
  const startSoum = soum(searchParam?.startPlace || "");
  const startAimag = aimag(startSoum?.parent || "");

  const endSoum = soum(searchParam?.endPlace || "");
  const endAimag = aimag(endSoum?.parent || "");

  const filterModel: FilterModel = {
    start_place: searchParam?.startPlace
      ? {
          filter: `${startAimag?.label} - ${startSoum?.label}`,
          filterType: "text",
          type: "contains",
        }
      : undefined,
    end_place: searchParam?.endPlace
      ? {
          filter: `${endAimag?.label} - ${endSoum?.label}`,
          filterType: "text",
          type: "contains",
        }
      : undefined,
    start_time: searchParam?.startTime
      ? {
          filter: searchParam.startTime,
          filterType: "text",
          type: "contains",
        }
      : undefined,
  };

  return {
    startRow: 0,
    endRow: 100,
    sortModel: [{ colId: "id", sort: "desc" }],
    filterModel,
  };
}
