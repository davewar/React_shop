import React, {useContext,useState,useEffect} from 'react'
import {ShoppingContext} from '../../contexts/shopping'

const Filters = () => {

    const { search, setSearch,categorySelection, setCategorySelection, setCategorysGlobal } = useContext(ShoppingContext);    //global

    const [category, setCategory] = useState(null)  //list of category
      

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const getCategorys = async () =>{

            try{

                const res = await fetch('/api/category')
                const data = await res.json() 
                // console.log(data);
                setCategory(data)
                setCategorysGlobal(data)
                setLoading(false)

            }

            catch(err){
                console.log(err.message);
                setError(true)
            }

        }

        useEffect(() => {
            let isActive= true
            getCategorys()

            return ()=>{isActive=false}
        }, [])

    
        const handleCategory = (e)=>{
            const val = e.target.value
                setCategorySelection(val)
            // console.log(val)

        }
   

    return (
            <>
            {
                loading && <div>Loading........</div>
            }

            {
                error && <div>Error with loading of page. Please refresh page.</div>
            }

        <div className="container ms-1  mb-5">
            
        {
            category && <>      

                                <div className="row">
                                        <div className="col-8-md  mb-2"> 

                                                <div className="form-group">
                                                    {/* <label className="m-0">Filter:</label> */}
                                                    <input type="text" className="form-control" 
                                                    value={search}
                                                    onChange={(e)=>setSearch(e.target.value)}
                                                    placeholder="Search..."/>
                                                </div>

                                        </div> 
                                </div>
                                <div className="row">
                                        <div className="col-6 mb-2">
                                                <span> Filters: </span>
                                                <select name="category" value={categorySelection} onChange={handleCategory} >
                                                    <option value="all">All Products</option>
                                                    {
                                                        category.map(item => (
                                                            <option value={item.name} key={item._id}>
                                                                {item.name}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                        </div>
                                </div>

                                
                        </>
        }

        </div>
        </>
            
    )
}

export default Filters
