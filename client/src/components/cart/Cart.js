import React, {useContext, useEffect} from 'react'
import {ShoppingContext} from '../../contexts/shopping'
import { Link, Redirect } from 'react-router-dom';
import {FaTrashAlt} from 'react-icons/fa'
import  PaypalButton from './Paypal'
import {clearStorage} from '../../utils/storage'

import {UserContext} from '../../contexts/user'



const Cart = () => {

    const { cart, setCart, increaseQty, reduceQty, removeItem, clearBasket, total, getTotal  } = useContext(ShoppingContext);    //global
    const { accessToken, isLogged, isAdmin  } = useContext(UserContext);

    useEffect(() => {
        let IsActive = false
        getTotal()

        return ()=>IsActive = true
    }, [cart])

    if(!cart || cart.length === 0  ){

        return <>

            <h1>No Items in basket</h1>
            <button className="btn border"><Link to={`/products`}>CONTINUE SHOPPING</Link></button>
             </>
    } 


    const tranSuccess = async(payment) => {

        // console.log(payment);
        const {paymentID, address} = payment;
            // console.log(accessToken);
       
                const res = await fetch('/api/payments', { 
                method: 'POST', 
                body: JSON.stringify({ cart, paymentID, address}),
                headers: {'Content-Type': 'application/json',
                        credentials: 'include',
                        Authorization: accessToken                      
                        }
           
                });

            
            const data = await res.json()
            // console.log(data);
                           
            alert("You have successfully placed an order.")
                           
            // clear cart
            setCart([])
            //delete local storage
            clearStorage()

   
    }

    if(!isLogged){

         return <Redirect to="/signin"/>  
       
    }
   
    return (
        <>  
            <div className="row">
                <div className="col-6 d-flex justify-content-start">
                <h1 className="text-center text-uppercase text-secondary ">Cart</h1>
                </div>
                 <div className="col-6 d-flex justify-content-end">
                <h3 className="text-center">Total -  £ {total}</h3>
                </div>

            </div>

                 <div className="row ">
                    <div className="col-12 d-flex justify-content-start">
                            <button className="btn btn-secondary" onClick={() => clearBasket()}>REMOVE ALL ITEMS</button>  
                    </div>
                 </div>

                 <div className="row mb-5">
                    <div className="col-12 d-flex justify-content-end">
                            <PaypalButton
                                total={total}
                                tranSuccess={tranSuccess} /> 
                    </div>
                 </div>

                 <div className="container">
            <div className="d-flex flex-row flex-wrap justify-content-between">
            {
                cart ? cart.map((item) =>{
                    return <div key={item._id}className="card mt-2 mb-4 t h-25" style={styledObj} >

                          <img src={item.image} className="card-img-top" alt=""/>
                        {/* <img className="" src={item.image} alt={item.title}/> */}

                        <div className="card-body d-flex justify-content-end ">
                                <button className="btn " onClick={() => removeItem(item._id)}><FaTrashAlt style={{height: "2rem", color:"black" , width:"2rem"}}/></button>   
                        </div>  

                        <div className="card-body">
                                <h1 className="card-title">{item.title}</h1>
                                
                                <p className="card-text">Price: £{item.price}</p>                                
                               <h4>Total Price: £{item.price * item.count}</h4>
                        </div>

                        <div className="card-body">
                        
                                        <button className="btn btn primary border mr-2" onClick={() => reduceQty(item._id)}> - </button>
                                        <span className="">{item.count}</span>
                                        <button className="btn btn primary border ml-2" onClick={() => increaseQty(item._id)}> + </button>
                         </div>

                        <button className="btn border"><Link to={`/products`}>CONTINUE SHOPPING</Link></button>
                                
                    </div>

               

            }) : null
            
            
            }
            </div>
            </div>

           

        </>
    )
}


const styledObj  = {
    width: "40%",
    minWidth: "450px",
 
}

export default Cart
