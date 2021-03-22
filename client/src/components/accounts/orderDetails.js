import React, {useState, useEffect, useContext} from 'react'
import {useParams,Link} from 'react-router-dom'
import {UserContext} from '../../contexts/user'
import * as ROUTES from '../../constants/routes'

function OrderDetails() {
   

    const { history, } = useContext(UserContext);    //global user    
    
    const [orderDetails, setOrderDetails] = useState([])

    const {id} = useParams()
    // console.log(id);

    useEffect(() => {
        if(id){
            history.forEach(item =>{
                if(item._id === id){
                    setOrderDetails(item)
                } 
            })
        }
    },[id, history])


    if(orderDetails.length === 0) return null;

    return (

        
        <div className="container mt-1">

            <button className="btn" ><Link to={ROUTES.HISTORY}>Back to accounts</Link></button>

            <table className="table table-bordered mt-3">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Country Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails.address.recipient_name}</td>
                        <td>{orderDetails.address.line1 + " - " + orderDetails.address.city}</td>
                        <td>{orderDetails.address.postal_code}</td>
                        <td>{orderDetails.address.country_code}</td>
                    </tr>
                </tbody>
            </table>

            <table className="table table-bordered" >
                <thead className="thead-dark">
                    <tr>
                        
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Dispatched</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item =>(
                        <tr key={item._id}>
                            <td>{item.title}</td>
                            <td>{item.count}</td>
                            <td>{item.price}</td>
                            <td>£ {item.price * item.count}</td>
                            <td>{item.Sent ? "Yes": "No"}</td>
                           
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
            
        </div>
    )
}

export default OrderDetails
