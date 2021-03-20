import http from "./httpService";
import { apiEndPoint } from "../config.json";
export function SendMail(email, subject, message) {
  return http.post(`${apiEndPoint}/access`, {
    email: email,
    subject: subject,
    message: message,
  });
}
export function sendEmailNewFeedback(email,msg){
  return http.post(`${apiEndPoint}/newfeedback`,{email:email,message:msg});
}
