import React, {createContext,useEffect,useState} from 'react';

export const UserContext = createContext()

const UserProvider = ({children})=>{

        const [user, setUser] = useState("")
        const [accessToken, setAccessToken] = useState("")
        const [isLogged, setIsLogged] = useState(false)
        const [isAdmin, setIsAdmin] = useState(false)
        const [history, setHistory] = useState([])

                
        // finds out if logged user is admin or customer
        useEffect(() => {
             if(accessToken){
                const getUser = async () =>{

                    try {
                        
                    const res = await fetch('/user/infor',{
                        headers: {Authorization: accessToken}
                    })

                    const data = await res.json()

                    // console.log("GETUSER",data)

                    setIsLogged(true)
                    setUser(data.name)
                    data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                  

                } catch (err) {
                    console.log("DW",err.message)
                }
            }

            getUser()
            
        }


    }, [accessToken])

       

    return (
        <UserContext.Provider value={{
           user, setUser,
           isLogged, setIsLogged,
           isAdmin, setIsAdmin,
           accessToken, setAccessToken,
            history, setHistory
        }} >

            {children}
        </UserContext.Provider>
    )

};

export default UserProvider;