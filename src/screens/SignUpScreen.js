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

export default function SignUpScreen({ navigation }) {
  return <AuthForm navigation={navigation} isSignIn={false} />;
}

const styles = StyleSheet.create({});