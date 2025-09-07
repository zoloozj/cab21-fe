import axios from "axios";

export async function getRequest(body: any) {
  const response = await axios.post(`/api/req`, body);
  return response.data;
}
