import http from "./httpService";
import { apiEndPoint } from "../config.json";
export function getSubjects() {
  return http.get(`${apiEndPoint}/subject`);
}
export function deleteSubject(subjectId) {
  return http.patch(`${apiEndPoint}/subject/${subjectId}`);
}
export function getSubjectProf() {
  return http.get(`${apiEndPoint}/professor/getsubjects`);
}
export function getSubjectStudent() {
  return http.get(`${apiEndPoint}/student/getsubjects`);
}
export function setSubject(subject) {
  return http.post(`${apiEndPoint}/subject`, { name: subject });
}
export function getSubjectById(subjectId)
{
  return http.get(`${apiEndPoint}/subject/${subjectId}`);
}
