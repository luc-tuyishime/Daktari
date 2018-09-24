import decode from "jwt-decode";
// import { browserHistory } from 'react-router';
import history from "../util/history";
import { API_BASE_URL, USER_PAYLOAD, TOGGLE_LOADER } from "../constants";
import auth0 from "auth0-js";
const ID_TOKEN_KEY = "id_token";
const ACCESS_TOKEN_KEY = "access_token";

const CLIENT_ID = "{AUTH0_CLIENT_ID}";
const CLIENT_DOMAIN = "AUTH0_DOMAIN";
const REDIRECT = "/signin";
const SCOPE = "YOUR_SCOPE";
const AUDIENCE = "AUDIENCE_ATTRIBUTE";

export function login() {
  clearIdToken();
  clearAccessToken();
  history.push("/signin");
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  history.push("/");
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({ pathname: "/" });
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(USER_PAYLOAD);
}

function clearAccessToken() {
  localStorage.removeItem(USER_PAYLOAD);
}

function getParameterByName(name) {
  console.log(localStorage.getItem(USER_PAYLOAD));
  var payload = JSON.parse(localStorage.getItem(USER_PAYLOAD) || "{}");
  return payload.name || false;
}

export function getUserDetails() {
  var payload = JSON.parse(localStorage.getItem(USER_PAYLOAD) || "{}");
  return payload;
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName("access_token");
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName("id_token");
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
  return getParameterByName("access_token");
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export function toggleLoader() {
  return {
      type: TOGGLE_LOADER
  }
}
