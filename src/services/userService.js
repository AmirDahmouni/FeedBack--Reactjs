import http from "./httpService";
import JwtDecode from "jwt-decode";
import { apiEndPoint } from "../config.json";
const endpoint = apiEndPoint + "/auth";

http.setjwt(getJwt());

export function getJwt() {
  return localStorage.getItem("token");
}

export async function login(email, password) {
  const { data: jwt } = await http.post(endpoint, {
    adress: email,
    password: password,
  });
  localStorage.setItem("token", jwt);
}
export function logout() {
  localStorage.removeItem("token");
}
export function getCurentuser() {
  const jwt = localStorage.getItem("token");
  return JwtDecode(jwt);
}
export function getProfessorById(userId)
{
  return http.get(`${apiEndPoint}/user/${userId}`);
}
