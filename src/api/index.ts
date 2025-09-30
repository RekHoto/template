import axios from "axios";

export const API_URL = __IS_DEV__ ? "/" : `${__API_URL__}/`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default $api;
