import React, { useState, useEffect } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import blog from "../api/blog";

export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState("");
  
  async function getUsername() {
    console.log("----- Getting Username -----");
    const token = await AsyncStorage.getItem("token");
    console.log(`Token is ${token}`);

    try {
      const response = await blog.get("/whoami", { 
        headers: { Authorization: `JWT ${token}` }
      });
      console.log("Got username!");
      await setUsername(response.data.username)
      console.log(`Username is ${username}`);

    } catch (error) {
      console.log("Error getting username!");
      if (error.response) {
        console.log(error.response.data);
        (error.response.data.status_code === 401) ? signOut() : null ;
      } else {
        console.log(error);
      };
    };
  };

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

  return (
    <View style={commonStyles.container}>
      <Text>Account Screen</Text>
      <Text>{username}</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({});
