import http from "./httpService";
import { apiEndPoint } from "../config.json";
export function getProfessorsByClass(classId) {
  return http.post(`${apiEndPoint}/professor/getByClassId`, {
    classId: classId,
  });
}
export function getProfessors() {
  return http.get(`${apiEndPoint}/professor`);
}

export function getProfessorStudent() {
  return http.get(`${apiEndPoint}/student/getprofessors`);
}
export function getSubjectsByProf(profId) {
  return http.post(`${apiEndPoint}/professor/getsubjectsByprofId`, {
    profId: profId,
  });
}
export function deleteClassProfs(classId) {
  return http.patch(`${apiEndPoint}/professor/deleteclass/${classId}`);
}
export function setProfessor(
  name,
  lastname,
  adress,
  password,
  classes,
  subjects
) {
  return http.post(`${apiEndPoint}/professor`, {
    name: name,
    lastname,
    adress: adress,
    password: password,
    classes: classes,
    subjects: subjects,
  });
}
export function deleteProfessor(id) {
  return http.delete(`${apiEndPoint}/professor/${id}`);
}
