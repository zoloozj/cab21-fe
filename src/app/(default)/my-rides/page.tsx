import axios from "axios";
import { customError } from "@/lib/utils";
import MyRidesList from "@/sections/my-rides/my-rides-list";

export default async function MyRidesPage() {
  return <MyRidesList />;
}
