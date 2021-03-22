import React, {useState, useEffect, useContext} from 'react'
import { Link, useParams } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import {ShoppingContext} from '../../contexts/shopping'

const ProductDetails = () => {

        const { addItem, products } = useContext(ShoppingContext);    //global
        

        const [product, setProduct] = useState([])
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(false)

        const {id} = useParams()
        // console.log(id);

        useEffect(() => {
        let isActive = false

                    try{
                        const getProduct = () =>{
                            let item = products.filter(x => x._id === id)
                            return item
                        }
                        
                        let item = getProduct()
                        
                        setProduct(item[0])
                        setLoading(false)
                    }
                    catch(err){
                        console.log(err.message)
                        setError(true)
                    }
                    
            return ()=> isActive = true

        }, [])
       

    const { _id,title, description, price, image} =  product

    return (
        <>
            {
                loading && <div>Loading........</div>
            }

            {
                error && <div>Error with loading of page. Please refresh page.</div>
            }

            {   
            product ?    (              

                        <div className="card" key={_id}>

                                <img className="card-img-top" src={image} alt={title}/>

                                <div className="card-body">
                                    <h2 className="card-title">{title}</h2>
                                    <span>Price: £ {price}</span>
                                    <p className="card-text">{description}</p>
                                </div> 
                                
                                <div className="card-body">
                                    <button className="btn btn-primary border" onClick={()=> addItem(product)}>BUY</button>
                                    <button className="btn border" ><Link to={ROUTES.PRODUCTS}>Back to products</Link></button>
                                </div>
                        
                            
                        </div>
                       
            
                )
                :
                <h1>Unable to display item. Please try later</h1>
        
            }
            


        </>
    )
}

export default ProductDetails
