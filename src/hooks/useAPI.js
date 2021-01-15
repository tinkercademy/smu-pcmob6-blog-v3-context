import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import blog from "../api/blog";

export function useUsername(signoutCallback) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      console.log(`Token is ${token}`);

      if (token == null) {
        setError(true);
        setUsername(null);
      } else {
        try {
          const response = await blog.get("/whoami", {
            headers: { Authorization: `JWT ${token}` },
          });
          setUsername(response.data.username);
          setLoading(false);
        } catch (e) {
          setError(true);
          setUsername(null);
          setLoading(false);
        }
      }
    })();
    setRefresh(false);
  }, [refresh]);

  return [username, loading, error, setRefresh];
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
