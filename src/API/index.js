import axios from "axios";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

// const BASE_URL = process.env.BASE_URL;
// const AUTH_TOKEN = process.env.AUTH_TOKEN;

const BASE_URL = "https://staging.euphoria.pk/";
// const BASE_URL = "http://localhost:3000";
const AUTH_TOKEN = "5HnrxX7zzsxlMb315NZtczUzdUUKDt";

export const API = {
  BASE_URL: BASE_URL,
  LOGIN: "/api/v1/sessions/login",
  MARK_ATTENDANCE: "/api/v1/attendance",
  APPLY_FOR_LEAVE: "/api/v1/apply_leave",
  GET_BUILD_VERSION: "/api/v1/mobiles/build_version",
  TOKEN_EXPIRATION: "/api/v1/sessions/valid_session",
  BIOMETRIC_ENROLLMENT: "/api/v1/biometric_enrollments",
  APPLY_FOR_EXTRA_WORKING_DAY: "/api/v1/apply_extra_working_day",
  ATTENDANCE_STATUS: "/api/v1/attendance/check_attendance_status",
  ATTENDANCE_DETAILS: "/api/v1/attendance/user_attendance_details",
};

axios.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("isAuth");
    const requestConfig = config;
    requestConfig.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      Platform: Platform.OS,
      "X-API-TOKEN": AUTH_TOKEN,
    };
    return requestConfig;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const requestGet = (url, params, extraHeaders = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BASE_URL + url, {
        params,
        headers: {
          Accept: "application/json",
          ...extraHeaders,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const requestPost = (url, data, extraHeaders = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL + url, data, {
        headers: {
          Accept: "application/json",
          ...extraHeaders,
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
