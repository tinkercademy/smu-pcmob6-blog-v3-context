import React, { useState, useEffect, useCallback, useContext } from "react";
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
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import blog from "../api/blog";
import { useAuth } from "../hooks/useAPI";
import { Context as ThemeContext } from "../context/ThemeContext";

const AuthForm = ({ navigation, isSignIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, signup, loading, errorText] = useAuth(
    username,
    password,
    () => {
      navigation.navigate("TabStack");
    }
  );
  const { state, toggleTheme } = useContext(ThemeContext);

  console.log("rendering authform");
  console.log(state.colors);

  const Form = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {isSignIn ? "Log in to blog" : "Sign up for an account"}
          </Text>
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
              onPress={isSignIn ? login : signup}
              style={styles.loginButton}
            >
              <Text style={styles.buttonText}>
                {isSignIn ? "Log in" : "Sign up"}
              </Text>
            </TouchableOpacity>
            {loading ? (
              <ActivityIndicator style={{ marginLeft: 20, marginBottom: 20 }} />
            ) : null}
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(isSignIn ? "SignUp" : "SignIn");
            }}
            style={styles.switchButton}
          >
            <Text style={styles.switchText}>
              {isSignIn
                ? "Register for a new account"
                : "Have and account? Sign in"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.errorText}>{errorText}</Text>
          <View style={{ height: 20, alignItems: "left" }}></View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 24,
      backgroundColor: state.colors.background
    },
    title: {
      fontSize: 36,
      fontWeight: "bold",
      marginBottom: 24,
      color: state.colors.text
    },
    fieldTitle: {
      fontSize: 18,
      marginBottom: 12,
      color: state.colors.text
    },
    input: {
      borderColor: "#999",
      borderWidth: 1,
      marginBottom: 24,
      padding: 4,
      height: 36,
      fontSize: 18,
      backgroundColor: state.colors.background,
      color: state.colors.text
    },
    loginButton: {
      backgroundColor: state.colors.primary,
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
    switchText: {
      color: "blue",
    },
    errorText: {
      color: "red",
      height: 40,
    },
  });

  return Form();
};

export default AuthForm;
