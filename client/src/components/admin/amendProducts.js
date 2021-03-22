import React, {useState, useEffect, useContext} from 'react'
import * as ROUTES from '../../constants/routes';

import {UserContext} from '../../contexts/user'
import {ShoppingContext} from '../../contexts/shopping'
import { useParams, Link } from 'react-router-dom';

function AmendProduct() {

    const {id} = useParams()    

    const {isAdmin,accessToken} = useContext(UserContext);    //global user
    const {categorysGlobal,  products } = useContext(ShoppingContext) // global products   
    
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        let isActive = false
            try{
         const getProduct = () =>{
            let amendProduct = products.filter(x => x._id === id)
            return amendProduct
        }
        
        let item = getProduct()
        // console.log(amendProduct);
        setProduct(item[0])
        setLoading(false)
         }catch(err){
            console.log(err.message)
            setError(true)

         }

        return ()=> isActive = true

    }, [])
    
        
    const handleChangeInput = e =>{
        // console.log("HERE");

        const {name, value} = e.target
        console.log(name,value);
    
        if((name === "price" || name === "countInStock") && value <0){
            return
        }

        setProduct({...product, [name]: value})     


    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("Unauthorised")

            if(product.category === ""){
                alert("Please select a category")
                return

            }
            
            console.log(product);

           const res = await fetch('/api/products/update/' + id, { 
                method: 'POST', 
                body: JSON.stringify({ ...product }),
                headers: {'Content-Type': 'application/json',
                        credentials: 'include',
                        Authorization: accessToken
                        
                        }
           
                });

            
            const data = await res.json()
            console.log(data);
            if(data !== "item updated"){
                
                alert("Admin access lasts 10 mins, please refresh page and try again.")

            }else{
                alert(data)
                
            }
            
        } catch (err) {
            alert(err.message)
        }
    }
           
    
    return (
               <>
             {
                loading && <div>Loading........</div>
            }

            {
                error && <div>Error with loading of page. Please refresh page.</div>
            }
            
            {product &&

            
            <form onSubmit={handleSubmit}>                

                <div className="form-group">
                    <label >Title</label>
                    <input type="text" name="title" className="form-control" required
                       
                       value={product.title} onChange={handleChangeInput} />
                </div>

                <div className="form-group">
                    <label >Image</label>
                    <input type="text" name="image" className="form-control" required
                     value={product.image} onChange={handleChangeInput} />
                </div>

                <div className="form-group">
                    <label >Price</label>
                    <input type="number" name="price" className="form-control" required
                          value={product.price} onChange={handleChangeInput} />
                </div>

                <div className="form-group">
                    <label >Description</label>
                    <textarea type="text" name="description" className="form-control" required
                      value={product.description} rows="5" onChange={handleChangeInput} />
                </div>

               

                <div className="form-group">
                    <label >Categories: </label>
                    <select name="category" value={product.category}  className="form-control" onChange={handleChangeInput} >
                        
                        {
                            categorysGlobal.map(category => (
                                <option value={category.name} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>


                <div className="form-group">
                    <label >Stock Count</label>
                    <input type="number" name="countInStock" className="form-control" required
                       value={product.countInStock} onChange={handleChangeInput} />
                </div>        
                

                <button className="btn btn-primary" type="submit">Save</button>
                <button className="btn border" ><Link to={ROUTES.PRODUCTS}>Back to products</Link></button>
                <div>

                </div>
                 
                
            </form>

           }
       </>
    )
}



export default AmendProduct
