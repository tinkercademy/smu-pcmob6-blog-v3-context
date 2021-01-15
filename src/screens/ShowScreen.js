import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context as BlogContext } from "../context/BlogContext";
import { Context as ThemeContext } from "../context/ThemeContext";
import { EvilIcons } from "@expo/vector-icons";

const ShowScreen = ({ route }) => {
  const { state: blogState } = useContext(BlogContext);
  const { state: themeState } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeState.colors.background,
      borderColor: themeState.colors.border,
    },
    text: {
      color: themeState.colors.text
    }
  });

  const blogPost = blogState.find(
    (blogPost) => blogPost.id === route.params.id
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{blogPost.title}</Text>
      <Text style={styles.text}>{blogPost.content}</Text>
    </View>
  );
};

export default ShowScreen;