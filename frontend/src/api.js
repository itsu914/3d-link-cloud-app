import axios from "axios";
const API_URL = "http://localhost:4000/api/links";

export async function getLinks() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function addLink(url, title) {
  const res = await axios.post(API_URL, { url, title });
  return res.data;
}