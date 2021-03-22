
export const addToStorage =(item)=>{
            // console.log(cart);
    localStorage.setItem("basket", JSON.stringify(item))
    
}

export const getStorage = ()=>{

    const data = JSON.parse(localStorage.getItem("basket"))
    return data
}

export const clearStorage = ()=>{

    localStorage.removeItem("basket")
    
}