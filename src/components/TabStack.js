import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from "react-native";
import AccountScreen from "../screens/AccountScreen";
import IndexScreen from "../screens/IndexScreen";
import ShowScreen from "../screens/ShowScreen";
import CreateScreen from "../screens/CreateScreen";
import EditScreen from "../screens/EditScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { EvilIcons } from "@expo/vector-icons";
import { navigationRef } from "../../navigation/RootNavigation";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BlogStack() {
  return (
    <Stack.Navigator initialRouteName="Index">
      <Stack.Screen
        component={IndexScreen}
        name="Index"
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => navigationRef.current.navigate("Create")}
            >
              <EvilIcons name="plus" size={35} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        component={ShowScreen}
        name="Show"
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                navigationRef.current.navigate("Edit", {
                  id: navigationRef.current.getCurrentRoute().params.id,
                });
              }}
            >
              <EvilIcons name="pencil" size={35} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen component={CreateScreen} name="Create" />
      <Stack.Screen component={EditScreen} name="Edit" />
    </Stack.Navigator>
  );
}

export default function TabStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Blog" component={BlogStack} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
