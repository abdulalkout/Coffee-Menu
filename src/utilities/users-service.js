// users-service.js
import * as usersAPI from "./users-api";

// export function getToken() {
//   // getItem returns null if there's no string
//   const token = localStorage.getItem("token");
//   if (!token) return null;
//   // Obtain the payload of the token
//   const payload = JSON.parse(atob(token.split(".")[1]));
//   // A JWT's exp is expressed in seconds, not milliseconds, so convert
//   if (payload.exp < Date.now() / 1000) {
//     // Token has expired - remove it from localStorage
//     localStorage.removeItem("token");
//     return null;
//   }
//   return token;
// }

export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    // Attempt to decode the token
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Check if the payload exists
    if (!payload) {
      throw new Error("Invalid token payload");
    }

    // A JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
      // Token has expired - remove it from localStorage
      localStorage.removeItem("token");
      return null;
    }

    return token;
  } catch (error) {
    // Handle decoding errors
    console.error("Error decoding token:", error);
    localStorage.removeItem("token");
    return null;
  }
}

export function checkToken() {
  // Just so that you don't forget how to use .then
  return (
    usersAPI
      .checkToken()
      // checkToken returns a string, but let's
      // make it a Date object for more flexibility
      .then((dateStr) => new Date(dateStr))
  );
}

export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // Baby step by returning whatever is sent back by the server
  localStorage.setItem("token", token);
  return getUser();
  // return token;
}

export function logOut() {
  localStorage.removeItem("token");
}

export async function logIn(credentials) {
  try {
    const token = await usersAPI.logIn(credentials);
    localStorage.setItem("token", token);
    return getUser();
    // return token;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
