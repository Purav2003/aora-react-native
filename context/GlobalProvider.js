import { createContext,useContext,useState,useEffect } from "react";
import { getCurrentUser } from "../lib/appWrite";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [user,setUser] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
        .then((res)=>{
            if(res){
                setUser(res)
                setIsLoggedIn(true)
            }
            else{
                setIsLoggedIn(false)
                setUser(null)
            }
        })
        .catch((e)=>{
            console.log(e)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[])

    return (
        <GlobalContext.Provider
        value={{
            isLoggedIn,
            user,
            isLoading,
            setUser,
            setIsLoggedIn

        }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider