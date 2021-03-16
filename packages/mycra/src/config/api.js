import axios from "axios";
import { toast } from "react-toastify";

const {
  localStorage: { setItem, getItem },
} = window;

const getItemsFromLocalStorage = () => {
  const a = getItem("a");
  const b = getItem("b");
  const c = getItem("c");
  const d = getItem("d");

  return { a, b, c, d };
};

const clearItemsFromLocalStorage = () => {
  try {
    setItem("a", null);
    setItem("b", null);
    setItem("c", null);
    setItem("d", null);
    return 0;
  } catch (error) {
    console.error(`Error: ${error}`);
    return -1;
  }
};

const logout = () => {
  return clearItemsFromLocalStorage();
};

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

// interceptor for all the requests
API.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers["USER-ACCESS-TOKEN"] = getToken();
    config.headers["TENANT-ID"] = getTenantId();
    config.headers["CLIENT-ID"] = getClientId();
    config.headers["APP-ID"] = getAppId();
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Authorization"] =
      "Basic ZWRnZS0tZGV2LS10ZHAtY2UtLXVzci0wMTo5N2JmZTJiZGY1ZWJmZTQ3OWYzNzdiMTRiYTg4NmY5OA==";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// interceptor for all the responses
API.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // sniff cookies if you can
    // sniff auth tokens if you can
    return response;
  },
  function (error) {
    if (401 === error.response.status || undefined) {
      toast.error(error.response.data.message);
      logout();
      //return
      // localStorage.clear();
      // return <Redirect to='/auth/login' />;
    } else {
      toast.error("Sorry, something went wrong");
      return Promise.reject(error);
    }
  }
);

export default API;
