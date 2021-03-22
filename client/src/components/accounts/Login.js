import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {UserContext} from '../../contexts/user'
import * as ROUTES from '../../constants/routes'


const Login = () => {

    const {setAccessToken} = useContext(UserContext);    //global user
      const history = useHistory()
    

    const [signInErr, setSignInErr] = useState("")
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [emailErr, setemailErr] = useState('');
    const [passwordErr, setpasswordErr] = useState('');

   

    const handleChange = (e, name) => {

        //clear
      setSignInErr("")

    const user = {};
    const emailRegEx = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    user[name] = e.target.value;
    // validations
    switch (name) {
      case 'email':
        setemail(user.email);
        !emailRegEx.test(user.email) ? setemailErr('Invalid Email!') : setemailErr('');
        break;
      case 'password':
        setpassword(user.password);
        user.password.length < 6 ? setpasswordErr('Password must be at least 6 characters!') : setpasswordErr('');
        break;
      default:
        break;
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (email && password && !emailErr && !passwordErr) {

          //clear         
          setSignInErr("")
      

        
    try {
      const res = await fetch('/user/login', { 
        method: 'POST', 
        body: JSON.stringify({ email, password }),
        headers: {'Content-Type': 'application/json',
                credentials: 'include'
                }
           
      });
      const data = await res.json();
      console.log(data);

      if (data.errors) {

            
            setSignInErr(data.errors)
           
            
       
      } else
      if (data.user) {
          // console.log("HERE1");
          localStorage.setItem('firstLogin', true)
          setAccessToken(data.accesstoken)
   
            history.push("products")

          // window.location.href = "/products"
               
      }

    }
    catch (err) {
      console.log(err);
    }

    }
  }

  return (
   
    <div className="container ">

        <div className="row mt-5  justify-content-center align-items-center  " >

          <div className="col-xs-12  sign-in" >

                    <h2 className="text-start mt-3">Sign In</h2>
                    {signInErr && <div className="alert alert-danger text-center">
                      <span className="text-danger text-capitalize">{signInErr}</span>
                    </div>}

                    <form className="mt-4 " onSubmit={handleSignIn}>
                      <div className="form-group">
                            <label className="mr-3" htmlFor="email">Enter Email Address</label>
                            <input
                              type="email"
                              name="email"
                              className={ emailErr ? "form-control-lg is-invalid":
                                    !emailErr && email.length ? "form-control is-valid":"form-control"
                                }
                          
                              id="email"
                              placeholder="Email Address"
                              required
                              autoComplete="on"
                              onChange={(e) => handleChange(e, 'email')}
                            />
                            {emailErr && <small className="text-danger">{emailErr}</small>}
                      </div>

                      <div className="form-group">
                            <label className="" htmlFor="password">Enter Password</label>
                            <input
                              type="password"
                              name="password"
                              className={ passwordErr ? "form-control is-invalid":
                                    !passwordErr && password.length ? "form-control is-valid":"form-control"
                                }
                            
                              id="password"
                              placeholder="Password"
                              required
                              autoComplete="off"
                              onChange={(e) => handleChange(e, 'password')}
                            />
                            {passwordErr && <small className="text-danger">{passwordErr}</small>}
                      </div>
                      <input type="submit" className="btn btn-primary" value="Sign In" />
                    </form>
                    <p className="float-left mt-2">    
                          Don't yet have an account?<Link to='/signup'>Sign up</Link>
                    </p>

                </div>    

        </div>
  
    </div>
  )
}

export default Login
