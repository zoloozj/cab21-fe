import axios from "axios";
import { customError } from "@/lib/utils";
import MyRidesList from "@/sections/my-rides/my-rides-list";

export async function getMyRides(body: any) {
  const response = await axios.post(`/api/req`, body);
  return response.data;
}

export default async function MyRidesPage() {
  return <MyRidesList />;
}
