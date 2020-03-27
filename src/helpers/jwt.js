export const getJwt = () => {
  return localStorage.getItem("token");
};

export const delJwt = () => {
  return localStorage.removeItem("token");
};