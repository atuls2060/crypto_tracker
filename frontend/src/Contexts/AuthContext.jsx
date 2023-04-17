import { createContext, useState } from "react";


export const AuthContext = createContext();

const user = JSON.parse(localStorage.getItem("user")) || ""
export const AuthContextProvider = ({ children }) => {
    const [name, setName] = useState(user?.username);
    const [isLoggedIn, setIsLoggedIn] = useState(user !== "");


    const setLoggedInUser = (data) => {
        setName(data.username)
        localStorage.setItem("user", JSON.stringify({ ...data }))
        setIsLoggedIn(true)
    }
    const logoutUser = () => {
        localStorage.removeItem("user")
        setIsLoggedIn(false)
    }

    return <AuthContext.Provider value={{ name, isLoggedIn, setLoggedInUser, logoutUser }}>
        {
            children
        }
    </AuthContext.Provider>
}