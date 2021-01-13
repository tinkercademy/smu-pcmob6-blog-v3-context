import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import blog from "../api/blog";
import axios from "axios";

export function useUsername(signoutCallback) {
  async function getUsername() {
    console.log("---- Getting user name ----");
    const token = await AsyncStorage.getItem("token");

    if (token == null) {
      console.log("User not signed in. Redirecting to Sign In page.");
      signoutCallback();
      return null;
    }

    console.log(`Token is ${token}`);

    try {
      const response = await blog.get("/whoami", {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log("Got user name!");
      return response.data.username;
    } catch (error) {
      console.log("Error getting user name");
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data.status_code === 401) {
          signoutCallback();
          return null;
        }
      } else {
        console.log(error);
      }
      return null;
    }
  }

  return getUsername;
}

export async function useAuth(formType, username, password) {
  
  console.log(`----- ${formType} time -----`);

  try {
    console.log(endpoint);
    const response = await blog.post(endpoint, { username, password });
    console.log("Success!");
    console.log(response);

    await AsyncStorage.setItem("token", response.data.access_token);
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.log("Error!");
    console.log(error);
    return error;
  }
}
