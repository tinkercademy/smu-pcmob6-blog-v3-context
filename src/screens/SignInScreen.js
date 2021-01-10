import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import blog from "../api/blog";
import AuthForm from "../components/AuthForm";

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const formType = "Sign in";

  async function signIn() {
    console.log("---- Login Time -----");
    Keyboard.dismiss();

    try {
      setLoading(true);
      const response = await blog.post("/auth", { username, password });
      console.log("Success logging in!");

      await AsyncStorage.setItem("token", response.data.access_token);
      setLoading(false);

      console.log(AsyncStorage.getItem("token"));
      navigation.navigate("Index");
    } catch (error) {
      setLoading(false);
      console.log("Error logging in!");
      console.log(error.response);

      setErrorText(error.response.data.description);
    }
  }

  return (
    <AuthForm 
      username={username}
      password={password}
      errorText={errorText}
      loading={loading}
      formType={formType}
      signIn={signIn}
    />
  );
};