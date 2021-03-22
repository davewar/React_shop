import React, { useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {UserContext} from '../../contexts/user'
import * as ROUTES from '../../constants/routes';


const History = () => {

    const { history, setHistory,accessToken, isAdmin } = useContext(UserContext);    //global user

         const [loading, setLoading] = useState(true)
        const [error, setError] = useState(false)

        useEffect(() => {

            let isActive = false

                    const getHistory = async() =>{
                        
                        if(isAdmin){

                                try{

                                    const res = await fetch('/api/payments', {
                                        headers: {Authorization: accessToken}
                                    })

                                    const data = await res.json()
                                    // console.log(data);
                                    setHistory(data)
                                    setLoading(false)

                                }catch(err){
                                    console.log(err.message)
                                     setHistory([])
                                    setError(true)
                                }    

                        } else{
                                try{
                                    const res = await fetch('/user/history', {
                                        headers: {Authorization: accessToken}
                                    })

                                    const data = await res.json()
                                    // console.log(data);
                                    setHistory(data)
                                    setLoading(false)

                                }catch(err){

                                     console.log(err.message)
                                     
                                    setHistory([])
                                    setError(true)
                                }
                        }
                   
                }

                getHistory()

                return ()=> isActive = true

        }, [accessToken,setHistory,isAdmin])
     
       if(error){
           return <div>Error with loading of page. Please refresh page.</div>
       }


    return (

        <>
            {
                loading && <div>Loading........</div>
            }

            {
                error && <div>Error with loading of page. Please refresh page.</div>
            }

            {history.length > 0 ?
           <div className="container">

                <div className="row ">
                        
                     <h2>Account History</h2>         
         
                    <button className="btn " ><Link to={ROUTES.PRODUCTS}>Back to products</Link></button>

                </div>
           
          
            <p>You have {history.length} purchases</p>
            
            <table className="table table-hover ">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Payment ID</th>
                        <th scope="col">Date of Purchased</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                      history.map(item => (
                            <tr key={item._id}>
                                <td>{item.paymentID}</td>
                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/history/${item._id}`}>View</Link></td>
                            </tr>
                        )) 
                    }
                </tbody>
            </table>
            
        </div> 
        :<p>You have 0 purchases</p>
        }
       </> 
    )
}

export default History
