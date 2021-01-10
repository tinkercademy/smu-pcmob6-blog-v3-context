import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
import { EvilIcons } from "@expo/vector-icons";
import { commonStyles } from "../../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://amirulraziqi.pythonanywhere.com";
const API_WHOAMI = "/whoami";

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost } = useContext(Context); // access BlogContext object
  const [username, setUsername] = useState("");

  console.log(navigation)
  async function getUsername() {
    console.log("----- Getting Username -----");
    const token = await AsyncStorage.getItem("token");
    console.log(`Token is ${token}`);

    try {
      const response = await axios.get(API + API_WHOAMI, { 
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
    console.log("----- Setting Up Nav Listener -----")

    const removeListener = navigation.addListener("focus", () => {
      console.log("Running Nav Listener");
      setUsername("");
      getUsername();
    });

    getUsername();
    return removeListener;
  }, []);

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.id.toString()} // where blogPost is each elem in blogPosts
        renderItem={({ item }) => {
          // item refers to indivudal blogPost elem object
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <EvilIcons
                    name="trash"
                    size={24}
                    color="black"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "gray",
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 30,
  },
});

export default IndexScreen;