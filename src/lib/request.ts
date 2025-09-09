import axios from "axios";

export async function postRequest(body: any) {
  const response = await axios.post(`/api/req`, body);
  return response.data;
}

export async function putRequest(body: any) {
  const response = await axios.put(`/api/req`, body);
  return response.data;
}
