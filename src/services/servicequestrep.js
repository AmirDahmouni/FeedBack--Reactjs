import http from "./httpService";
import { apiEndPoint } from "../config.json";
export function voteFeedback(feedId, questId, answerId) {
  return http.post(`${apiEndPoint}/questionanswer`, {
    feedback: feedId,
    question: questId,
    answer: answerId,
  });
}
