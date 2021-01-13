import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import blog from "../api/blog";

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

export function useAuth(username, password, navigationCallback) {
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  async function signup() {
    console.log("---- Signing up ----");

    try {
      setLoading(true);
      await blog.post("/newuser", {
        username,
        password,
      });
      console.log("Success signing up!");
      login();
    } catch (error) {
      setLoading(false);
      console.log("Error signing up!");
      console.log(error);
      setErrorText(error.response.data.description);
    }
  }

  async function login() {
    console.log("---- Login time ----");

    try {
      setLoading(true);
      const response = await blog.post("/auth", {
        username,
        password,
      });
      console.log("Success logging in!");
      // console.log(response);
      await AsyncStorage.setItem("token", response.data.access_token);
      setLoading(false);
      navigationCallback();
    } catch (error) {
      setLoading(false);
      console.log("Error logging in!");
      console.log(error);
      setErrorText(error.response.data.description);
    }
  }

  return [login, signup, loading, errorText];
}
