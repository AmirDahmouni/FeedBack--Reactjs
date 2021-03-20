import http from "./httpService";
import { apiEndPoint } from "../config.json";
export function getFeedbacks() {
  return http.get(`${apiEndPoint}/admin/getfeedbacks`);
}
export function getFeedbackByid(feedId) {
  return http.get(`${apiEndPoint}/feedback/getquestions/${feedId}`);
}
export function getnbbad(feedId, questId) {
  return http.get(
    `${apiEndPoint}/questionanswer/getnbbad/${feedId}/${questId}`
  );
}
export function getnbnotbad(feedId, questId) {
  return http.get(
    `${apiEndPoint}/questionanswer/getnbnotbad/${feedId}/${questId}`
  );
}
export function getnbgood(feedId, questId) {
  return http.get(
    `${apiEndPoint}/questionanswer/getnbgood/${feedId}/${questId}`
  );
}
export function getnbverygood(feedId, questId) {
  return http.get(
    `${apiEndPoint}/questionanswer/getnbverygood/${feedId}/${questId}`
  );
}
export function getnbexcell(feedId, questId) {
  return http.get(
    `${apiEndPoint}/questionanswer/getnbexcell/${feedId}/${questId}`
  );
}
export function setFeedback(name, professorId, classeId, subject, questionsId) {
  return http.post(`${apiEndPoint}/feedback/setfeedback`, {
    name: name,
    professor: professorId,
    class: classeId,
    subject: subject,
    nbvotes: 0,
    questions: questionsId,
  });
}
export function deleteFeedbackById(feedId) {
  return http.delete(`${apiEndPoint}/feedback/deletefeedback/${feedId}`);
}

export function getFeedbacksProf() {
  return http.get(`${apiEndPoint}/professor/getfeedbacks`);
}
export function getFeedbacksStudent() {
  return http.get(`${apiEndPoint}/student/getfeedbacks`);
}
export function incrementnbvotes(feedId) {
  return http.patch(`${apiEndPoint}/feedback`, {
    feedId: feedId,
  });
}
