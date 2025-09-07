export interface Ride {
  id: number;
  ride_id: number;
  driver_user_id: number | null;
  start_time: string; // e.g. "2025-09-02 01:00:00"
  start_place: string;
  end_place: string;
  ticket_price: number;
  ride_status: "OPEN" | "CLOSED" | string;
  booking_id: number | null;
  plate: string;
  model: string;
  capacity: number;
  passenger_count: number;
  booking_user_id: number | null;
  booking_status: string | null;
  phone: string;
}

export type TextFilterOp =
  | "contains"
  | "equals"
  | "startsWith"
  | "endsWith"
  | "inRange";
export type SortDir = "asc" | "desc";

export type FilterModel = {
  [key: string]:
    | {
        filter: string;
        filterType: "text" | "date";
        filterTo?: string;
        type: TextFilterOp;
      }
    | undefined;
};
export interface SortModelItem {
  colId: keyof Ride | string;
  sort: SortDir;
}
export interface GridRequest {
  endRow: number;
  startRow: number;
  sortModel: SortModelItem[];
  filterModel: FilterModel;
}

export interface Booking {
  id: number;
  ride_id: number;
  user_id: number;
  status: "BOOKED" | "CANCELLED" | "COMPLETED" | string; // extend as needed
  seat: number;
  created_at: string; // ISO timestamp
  first_name: string;
  last_name: string;
  phone: string;
}
