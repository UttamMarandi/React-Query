import axios from "axios";

const BASE_URL = "http://localhost:4000";

const client = axios.create({ baseURL: BASE_URL }); // creating a client instance

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token`;

  const onSuccess = (response) => response;
  const onError = (error) => {
    // catch errors depending on the error object

    return error;
  };

  return client(options).then(onSuccess).catch(onError);

  // onSuccess and onError are callbacks that runs on
}; // options contains all the the params that request accepts.
