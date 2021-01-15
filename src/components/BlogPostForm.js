import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { Context as ThemeContext } from "../context/ThemeContext";

const BlogPostForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  const { state: themeState } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeState.colors.background,
      borderColor: themeState.colors.border,
    },
    label: {
      fontSize: 24,
      marginTop: 20,
      marginBottom: 15,
      padding: 5,
      alignSelf: "center",
      color: themeState.colors.text
    },
    input: {
      height: 40,
      width: "90%",
      fontSize: 18,
      alignSelf: "center",
      marginBottom: 5,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: themeState.colors.border,
    },
    button: {
      fontSize: 24,
      margin: 10,
      color: themeState.colors.primary
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Title: </Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <Button
        title="Save Post"
        style={styles.button}
        onPress={() => onSubmit(title, content)}
      />
    </View>
  );
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: "",
    content: "",
  },
};

export default BlogPostForm;
