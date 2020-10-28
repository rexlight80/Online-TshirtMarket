import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`/api/products`, { method: "GET" })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
