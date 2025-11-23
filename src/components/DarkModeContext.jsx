// Modo oscuro
import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        if(darkMode){
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);


    return(
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

const useDarkMode = () =>{
    const context = useContext(DarkModeContext);
    if(!context){
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
};

export { DarkModeProvider, useDarkMode };