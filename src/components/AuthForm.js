import React, { useState, useEffect, useCallback } from "react";
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
  Switch
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import blog from "../api/blog";
import { useAuth } from "../hooks/useAPI";
import { useTheme } from "../context/ThemeContext";

const AuthForm = ({ navigation, isSignIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, signup, loading, errorText] = useAuth(
    username,
    password,
    () => {
      navigation.navigate("Index");
    }
  );

  const { colors, setScheme, isDark } = useTheme();

  const toggleScheme = () => {
    isDark ? setScheme("light") : setScheme("dark");
  };

  const containerStyle = {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    /*
     * the colors.background value will change dynamicly with
     * so if we wanna change its value we can go directly to the pallet
     * this will make super easy to change and maintain mid or end project
     */
    backgroundColor: colors.background,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={containerStyle}>
        <Switch value={isDark} onValueChange={toggleScheme} />
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
  switchText: {
    color: "blue",
  },
  errorText: {
    color: "red",
    height: 40,
  },
});

export default AuthForm;
