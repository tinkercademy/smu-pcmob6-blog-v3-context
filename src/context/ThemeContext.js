import React, { useState, useEffect, createContext, useContext } from "react";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native-appearance";
import { lightColors, darkColors } from "../../styles/colorThemes";
import createDataContext from "./createDataContext";

const ThemeReducer = (themeState, action) => {
    // state: { isDark, color, setScheme }
    // action: { type: "toggle_theme" || "default", payload: isDark === True || isDark === False }
    switch (action.type) {
        case "toggle_theme":
            console.log("This is", !action.payload.isDark);
            return {
                isDark: !action.payload.isDark,
                colors: !action.payload.isDark ? DarkTheme.colors : DefaultTheme.colors,
            };
        case "default":
            return themeState;
    }
}

const toggleTheme = (dispatch) => {
    return (isDark) => {
        dispatch({ type: "toggle_theme", payload: { isDark } })
    }
}

export const { Context, Provider } = createDataContext(
    ThemeReducer,
    { toggleTheme },
    { isDark: false, colors: lightColors }
);