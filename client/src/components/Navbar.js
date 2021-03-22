import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes'
import {FaShoppingCart} from 'react-icons/fa'
import {ShoppingContext} from '../contexts/shopping'
import {UserContext} from '../contexts/user'

 const Navbar = () => {

        const { cart  } = useContext(ShoppingContext);    //global
        const { isLogged, isAdmin, setIsLogged,  setIsAdmin,  setAccessToken, setUser, user  } = useContext(UserContext);    //global
    

         //items in basket
        const cartCount = ()=>{
                let count = 0
                if(!cart){
                  return count        
                } 

                cart.forEach(item=>{
                        let val = item.count
                        count += val

                })
                return count
        }

        const logOutUser = async ()=>{
               
                //remove cookie
                await fetch("/user/logout")
                //remove ls
                localStorage.removeItem('firstLogin')
                
                setIsLogged(false)
                setIsAdmin(false)
                setAccessToken("")
                setUser("")
        }

    return (
        <>
        <div className="row">
                <div className="col-12">   
                <h4 className="mt-2 d-flex justify-content-center">{user}</h4>
                </div >   
        </div>

        <div className="row">

        <div className="col-6">        

        <nav className=" navbar-nav navbar-expand-md navbar-light">
                
                <ul className="navbar-nav justify-content-between">
                        <li className="nav-item"><Link className="nav-item nav-link active" to={ROUTES.HOME}>Home</Link></li>
                        <li className="nav-item"><Link className="nav-item nav-link" to={ROUTES.PRODUCTS}>Products</Link></li>
                           {isLogged && <li className="nav-item"><Link className="nav-item nav-link"  to={ROUTES.HISTORY}>Account</Link></li>}
                         {!isLogged && <li className="nav-item"><Link className="nav-item nav-link" to={ROUTES.LOGIN}>SignIn</Link></li>}
                        {isLogged && <li className="nav-item"><Link className="nav-item nav-link" onClick={logOutUser} to={ROUTES.HOME}  >SignOut</Link></li>}                        
                                
                        {!isLogged && <li className="nav-item"><Link className="nav-item nav-link" to={ROUTES.REGISTER}>Register</Link></li>}
                        
                        {isAdmin && isLogged && <li className="nav-item "><Link className="nav-item nav-link text-success  "  to={ROUTES.CREATE_PRODUCT}>AddProduct</Link></li>}
                       
                
                </ul>


        </nav>

        </div>


                 <div className="col-6"> 
                        
                             <div className="d-flex mr-5 mt-5 justify-content-end">
                                     
                                    <span><Link to="/cart"><FaShoppingCart style={{height: "2rem", color:"black" , width:"2rem"}}/></Link>
                                        <span className=" border rounded-circle" style={{height: "1rem",color: "white", backgroundColor:"black" , width:"1rem"}}>{cartCount()}</span>

                                    </span>
                            </div>
                </div>

        </div>

        </>
    )
}

export default Navbar