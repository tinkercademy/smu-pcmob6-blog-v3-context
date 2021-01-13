import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  Switch,
  View,
  StatusBar,
} from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import blog from "../api/blog";
import { useTheme } from "../context/ThemeContext";

export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const { colors, setScheme, isDark } = useTheme();

  const toggleScheme = () => {
    isDark ? setScheme("light") : setScheme("dark");
  };

  async function getUsername() {
    console.log("----- Getting Username -----");
    const token = await AsyncStorage.getItem("token");
    console.log(`Token is ${token}`);

    try {
      const response = await blog.get("/whoami", {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log("Got username!");
      setUsername(response.data.username);
      console.log(`Username is ${username}`);
    } catch (error) {
      console.log("Error getting username!");
      if (error.response) {
        console.log(error.response.data);
        error.response.data.status_code === 401 ? signOut() : null;
      } else {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    console.log("Setting up nav listener!");

    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener!");
      setUsername(<ActivityIndicator />);
      getUsername();
    });
    getUsername();

    return removeListener;
  }, []);

  function signOut() {
    AsyncStorage.removeItem("token");
    navigation.navigate("SignIn");
  }

  const containerStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    /*
     * the colors.background value will change dynamicly with
     * so if we wanna change its value we can go directly to the pallet
     * this will make super easy to change and maintain mid or end project
     */
    backgroundColor: colors.background,
  };

  return (
    <>
      <StatusBar
        animated
        barStyle={isDark ? "light-content" : "dark-content"}
      />
      <View style={containerStyle}>
        <Text>Account Screen</Text>
        <Text>{username}</Text>
        <Switch value={isDark} onValueChange={toggleScheme} />
        <Button title="Sign out" onPress={signOut} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
