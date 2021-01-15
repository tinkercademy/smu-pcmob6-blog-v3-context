import React, { useState, useEffect, useContext } from "react";
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
import { Context as ThemeContext } from "../context/ThemeContext";
import { useUsername } from "../hooks/useAPI";

export default function AccountScreen({ navigation }) {
  const [username, loading, error, refresh] = useUsername();
  const { state, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (error) {
      signOut();
    }
  }, [error]);

  console.log("rendering authform");
  console.log(state.colors);

  useEffect(() => {
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      refresh(true);
    });
    return removeListener;
  }, []);

  function signOut() {
    AsyncStorage.removeItem("token");
    navigation.navigate("SignIn");
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      /*
       * the colors.background value will change dynamicly with
       * so if we wanna change its value we can go directly to the pallet
       * this will make super easy to change and maintain mid or end project
       */
      backgroundColor: state.colors.background,
      borderColor: state.colors.border,
    },
    text: {
      color: state.colors.text,
    },
  });

  return (
    <>
      <StatusBar
        animated
        barStyle={state.isDark ? "light-content" : "dark-content"}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Account Screen</Text>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.text}>{username}</Text>
        )}
        <Switch
          value={state.isDark}
          onValueChange={() => {
            toggleTheme(state.isDark);
            navigation.setOptions({
              headerStyle: {
                backgroundColor: state.colors.primary,
                height: 80,
              },
              headerTintColor: state.colors.text,
            });
          }}
        />
        <Button title="Sign out" onPress={signOut} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
