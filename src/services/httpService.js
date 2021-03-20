import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    alert("unexpected error ");
  }
  return Promise.reject(error);
});
export function setjwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  get: axios.get,
  delete: axios.delete,
  put: axios.put,
  post: axios.post,
  patch: axios.patch,
  all: axios.all,
  setjwt,
};
