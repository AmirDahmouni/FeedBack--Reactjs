import http from "./httpService";
import { apiEndPoint } from "../config.json";
export function getAnswers() {
  return http.get(`${apiEndPoint}/answer`);
}
