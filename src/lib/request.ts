import axios from "axios";

export async function postRequest(body: any) {
  const response = await axios.post(`/api/req`, body);
  return response.data;
}

export async function putRequest(body: any) {
  const response = await axios.put(`/api/req`, body);
  return response.data;
}

export async function deleteRequest(url: string) {
  const response = await axios.delete(`/api/req?url=${url}`);
  return response.data;
}

export async function getRequest(url: string) {
  const response = await axios.get(`/api/req?url=${url}`);
  return response.data;
}
