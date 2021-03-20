import http from "./httpService";
import { apiEndPoint } from "../config.json";

export function getStudents() {
  return http.get(`${apiEndPoint}/student`);
}
export function deleteFeedback(feedId) {
  return http.patch(`${apiEndPoint}/student/${feedId}`);
}
export function deleteStudentsClass(classId) {
  return http.delete(
    `${apiEndPoint}/student/deletestudentsbyclassId/${classId}`
  );
}
export function deleteStudent(studentId) {
  return http.delete(`${apiEndPoint}/student/${studentId}`);
}
export function setStudent(name, lastname, adress, password, classe) {
  return http.post(`${apiEndPoint}/student/`, {
    name: name,
    lastname: lastname,
    adress: adress,
    password: password,
    class: classe,
  });
}
export function getemailsByclass(classId)
{
  return http.get(`${apiEndPoint}/student/getemails/${classId}`);
}
