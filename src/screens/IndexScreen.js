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
import blog from "../api/blog";
import { useUsername } from "../hooks/useAPI";

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context); // access BlogContext object
  const [username, setUsername] = useState("");
  const getUsernameFromAPI = useUsername(signOut);

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

  useEffect(() => {
    getBlogPosts();

    const listener = navigation.addListener("didFocus", () => {
      getBlogPosts();
    })
    
    return listener;
  }, [])
  
  async function getUsername() {
    const name = getUsernameFromAPI();
    setUsername(name);
  };

  function signOut() {
    AsyncStorage.removeItem("token");
    navigation.navigate("SignIn");
  }

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
      <TouchableOpacity onPress={signOut} style={{ alignSelf: "center" }}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
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