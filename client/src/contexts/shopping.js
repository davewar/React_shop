import React, {createContext,useState} from 'react';

import { addToStorage, clearStorage} from '../utils/storage'

export const ShoppingContext = createContext()

const ShoppingProvider = ({children})=>{
  
    const [products, setProducts] = useState([])
     const [total, setTotal] = useState(0);
        const [cart,setCart] = useState([])
            const [categorysGlobal, setCategorysGlobal] = useState([])
        
    // Filter component
      const [categorySelection, setCategorySelection] = useState("all")  // selected category
      //search input box
    const [search, setSearch] = useState("")

        //add   
        // console.log(cart);

        const addItem = (addItem)=>{
            // console.log(item)
            const {price,_id, title,image,countInStock} = addItem           

            let obj = {_id, title, price,countInStock, image, count:1}
            // console.log(obj)

            //in basket already?
            const inBasket = cart.every(item => item._id !==_id)
            // console.log(inBasket)

            //not in basket -ie false            
            if(inBasket){
                const newList = [...cart,obj]
                // setCart([...cart,obj])
                setCart(newList)
                addToStorage(newList) // add to storage
                alert("Item added to cart.")
            }            
            else{
                //in basket - true
                 const newList = cart.map(item=>{
                     
                    if(item._id === _id){
                        
                        return {
                            ...item,
                           count: item.count +1
                        }
                   
                    }

                    return item
                    
                })

                setCart(newList)
                addToStorage(newList) // add to storage
                alert("Item added to cart.")
            
            }     
           
        }

        //reduce qty 
        const reduceQty = (id)=>{
              const newList = cart.map(item=>{
                     
                    if(item._id === id){

                        // no items below one
                        if(item.count === 1){

                              return {
                                    ...item,
                                count: item.count =1
                                }
                               
                        } else{

                             return {
                                    ...item,
                                count: item.count -1
                                }


                        }
                        
                       
                   
                    }

                    return item
                    
                })

                setCart(newList)
                addToStorage(newList) // add to storage
            
        }

        //increase qty

        const increaseQty = (id)=>{


             const newList = cart.map(item=>{
                     
                    if(item._id === id){
                        
                        return {
                            ...item,
                           count: item.count +1
                        }
                   
                    }

                    return item
                    
                })

                setCart(newList)
                addToStorage(newList) // add to storage
        }


        //remove
        const removeItem = (id)=>{

               const newList = cart.filter(item=> item._id !== id)

                setCart(newList)
                addToStorage(newList) // add to storage
        }

        //remove
        const clearBasket = ()=>{
            setCart([])
            setTotal(0)
           
            clearStorage() // remove storage

        }

        const getTotal = () => {
        
            const totalSum = cart.reduce((prev, item) => {
                return prev + (item.price * item.count);
            },0)
            // console.log(totalSum);
            setTotal(totalSum)

        };


    return (
        <ShoppingContext.Provider value={{
            products, setProducts,
            cart, setCart, 
            addItem,reduceQty,increaseQty,removeItem,clearBasket,
            total,getTotal,


            categorySelection, setCategorySelection,
            search, setSearch,

            categorysGlobal, setCategorysGlobal

        }} >

            {children}
        </ShoppingContext.Provider>
    )

};

export default ShoppingProvider;
