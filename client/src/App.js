import React, {useEffect, useContext} from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Pages from './pages/Pages';
import 'bootstrap/dist/css/bootstrap.css';
import {getStorage} from './utils/storage'
import {ShoppingContext} from './contexts/shopping'
import {UserContext} from './contexts/user'

function App() {

  const { setCart  } = useContext(ShoppingContext);    //global shopping cart
  const {setAccessToken} = useContext(UserContext);    //global user

  

    useEffect(() => {
      const storage = getStorage()
      
       if(storage){
          setCart(storage)
       } 
      // console.log(storage);  
      }, [])

      useEffect(() =>{

        const firstLogin = localStorage.getItem('firstLogin')
        
        if(firstLogin){

            const refreshToken = async () =>{
                           
                const res = await fetch('/user/refresh_token',{
                    credentials: 'include' })    
                        
                const data = await res.json()
                
                //get a new acccess token if cookie held
                  if(data.accesstoken){
                    setAccessToken(data.accesstoken)
                  }
                
                 }


            refreshToken()
        }
        },[])

       

  return (
    <div className="container">
        <Router>           
           <Pages />
        </Router>            
      
    </div>
  );
}

export default App;
