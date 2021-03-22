import React, {useState, useContext, useEffect} from 'react'

import {UserContext} from '../../contexts/user'
import {ShoppingContext} from '../../contexts/shopping'

const initialState = {
   
    title: "",
    image: "",
    price: "",
    description: "",
    category: "",
    countInStock: "",
    
}

function CreateProduct() {

    const {isAdmin,accessToken} = useContext(UserContext);    //global user
    const {categorysGlobal, setCategorysGlobal } = useContext(ShoppingContext) // global products   
    
    const [product, setProduct] = useState(initialState)
    

     const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    
    const getCategorys = async () =>{

            try{

                const res = await fetch('/api/category')
                const data = await res.json() 
                                
                setCategorysGlobal(data)
                setLoading(false)
            }

            catch(err){
                console.log(err.message);
                setLoading(false)
                setError(true)
            }

        }


        useEffect(() => {

            let isActive= true
            
                getCategorys()           
            
            return ()=>{isActive=false}
        }, [])
        
    
    const handleChangeInput = e =>{

        const {name, value} = e.target
    
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
            
                // console.log(product);

           const res = await fetch('/api/products/add', { 
                method: 'POST', 
                body: JSON.stringify({ ...product }),
                headers: {'Content-Type': 'application/json',
                        credentials: 'include',
                        Authorization: accessToken
                        
                        }
           
                });

            
            const data = await res.json()
            console.log(data);
            if(data !== "item added"){
                
                alert("Admin access lasts 10 mins, please refresh page and try again.")

            }else{
                alert(data)
                setProduct(initialState)
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
        
            {categorysGlobal &&

            
            <form onSubmit={handleSubmit}>                

                <div className="form-group">
                    <label >Title</label>
                    <input type="text" name="title" className="form-control" required
                    placeholder="Shirt"
                    value={product.title} onChange={handleChangeInput} />
                </div>

                <div className="form-group">
                    <label >Image</label>
                    <input type="text" name="image" className="form-control" required
                    placeholder="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
                    value={product.image} onChange={handleChangeInput} />
                </div>

                <div className="form-group">
                    <label >Price</label>
                    <input type="number" name="price" className="form-control" required
                    placeholder="1.00"
                    value={product.price} onChange={handleChangeInput} />
                </div>

                <div className="form-group">
                    <label >Description</label>
                    <textarea type="text" name="description" className="form-control" required
                    placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non assumenda maiores vero, consequuntur"
                    value={product.description} rows="5" onChange={handleChangeInput} />
                </div>

               

                <div className="form-group">
                    <label >Categories: </label>
                    <select name="category" value={product.category}  className="form-control" onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
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
                    placeholder="0"
                    value={product.countInStock} onChange={handleChangeInput} />
                </div>        
                

                <button className="btn btn-primary" type="submit">Add</button>
            </form>

           }
       </>
    )
}

export default CreateProduct
