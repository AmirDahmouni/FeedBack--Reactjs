import http from "./httpService";
import { apiEndPoint } from "../config.json";

export function setQuestion(question) {
  return http.patch(`${apiEndPoint}/question`, { quest: question });
}
export function deleteQuestion(questionId) {
  return http.patch(`${apiEndPoint}/question/${questionId}`);
}
export function getQuestions() {
  return http.get(`${apiEndPoint}/question`);
}
