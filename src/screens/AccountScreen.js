import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://amirulraziqi.pythonanywhere.com";
const API_WHOAMI = "/whoami";

export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState("");
  
  async function getUsername() {
    console.log("----- Getting Username -----");
    const token = await AsyncStorage.getItem("token");
    console.log(`Token is ${token}`);

    try {
      const response = await axios.get(API + API_WHOAMI, { 
        headers: { Authorization: `JWT ${token}` }
      });
      console.log("Got username!");
      setUsername(response.data.username)
      console.log(`Username is ${username}`);

    } catch (error) {
      console.log("Error getting username!");
      error.response ? console.log(error.response) : console.log(error);
    };
  };

  useEffect(() => {
    getUsername();
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
