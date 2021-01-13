import React from "react";
import { useState, useEffect } from "react";
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
} from "react-native";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAPI";

export default function SignInScreen({ navigation }) {
  return <AuthForm navigation={navigation} isSignIn={true} />;
}

const styles = StyleSheet.create({});
