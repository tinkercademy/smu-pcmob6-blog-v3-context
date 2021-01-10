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

  console.log(navigation);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign in to blog</Text>
        <Text style={styles.fieldTitle}>Username</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={(input) => setUsername(input)}
        />
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={(input) => setPassword(input)}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={signIn}
            style={styles.loginButton}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator style={{ marginLeft: 20, marginBottom: 20 }} />
          ) : null}
        </View>
        <Text style={styles.errorText}>{errorText}</Text>
        <View style={{ height: 20, alignItems: "left" }}></View>
        <Button title="Sign up here" onPress={() => navigation.navigate("SignUp")} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
  },
  fieldTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    marginBottom: 24,
    padding: 4,
    height: 36,
    fontSize: 18,
    backgroundColor: "white",
  },
  loginButton: {
    backgroundColor: "blue",
    width: 120,
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    marginBottom: 36,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    height: 40,
  },
});