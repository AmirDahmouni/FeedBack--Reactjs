import http from "./httpService";
import { apiEndPoint } from "../config.json";
export function getClasses() {
  return http.get(`${apiEndPoint}/class`);
}
export function getClassesProf() {
  return http.get(`${apiEndPoint}/professor/getclasses`);
}
export function setClass(filiere, niveau, groupe, subjects) {
  return http.post(`${apiEndPoint}/class`, {
    filiere: filiere,
    niveau: niveau,
    groupe: groupe,
    subjects: subjects,
  });
}
export function deleteClass(classId) {
  return http.patch(`${apiEndPoint}/class/${classId}`);
}
