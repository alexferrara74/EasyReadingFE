import { colors_blue, colors_light_blue } from '@/constants/Colors';
import React, {createContext, useContext, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(colors_light_blue)
    const [isLoadingTheme, setIsLoadingTheme] = useState(true);

    const findOldTheme = async () => {
        const themeMode = await AsyncStorage.getItem('themeMode');
        if (themeMode !== null) {
            themeMode === 'default' ? setTheme(colors_light_blue) : setTheme(colors_blue);
            setIsLoadingTheme(false);
          }
        setIsLoadingTheme(false);
    };
    
    useEffect(() => {
        findOldTheme();
    }, []);
    
    const updateTheme = (newTheme) => {
        setTheme(newTheme);
        AsyncStorage.setItem('themeMode', newTheme.themeMode);
    };

    return <ThemeContext.Provider value={{theme, isLoadingTheme, updateTheme}}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)

const style = StyleSheet.create({
    container: {}
});

export default ThemeProvider;