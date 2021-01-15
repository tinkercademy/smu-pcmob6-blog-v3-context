import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppearanceProvider } from "react-native-appearance";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import TabStack from "./src/components/TabStack";

import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { Provider as BlogProvider } from "./src/context/BlogContext";
import { Provider as ThemeProvider } from "./src/context/ThemeContext";
import { navigationRef } from "./navigation/RootNavigation";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  async function loadToken() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setSignedIn(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadToken();
  }, []);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : (
    <ThemeProvider>
      <BlogProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            mode="modal"
            initialRouteName="Account"
            screenOptions={{
              headerStyle: {
                backgroundColor: DefaultTheme.colors.primary,
                height: 80,
              },
              headerTintColor: DefaultTheme.colors.text,
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: "bold",
              },
              title: "Blogs",
              animationEnabled: false
            }}
          >
            <Stack.Screen component={TabStack} name="TabStack" />
            <Stack.Screen component={SignInScreen} name="SignIn" />
            <Stack.Screen component={SignUpScreen} name="SignUp" />
          </Stack.Navigator>
        </NavigationContainer>
      </BlogProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
