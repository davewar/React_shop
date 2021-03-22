import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import Cookies from 'js-cookie';

import {UserContext} from '../../contexts/user'





    

const Register = () => {

  const history = useHistory()
    
    const {setAccessToken} = useContext(UserContext);    //global user

    const [signUpErr, setSignUpErr] = useState("")

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confPassword, setconfPassword] = useState('');
  const [nameErr, setnameErr] = useState('');
  const [emailErr, setemailErr] = useState('');
  const [passwordErr, setpasswordErr] = useState('');
  const [confPasswordErr, setconfPasswordErr] = useState('');

  const handleChange = (e, name) => {

      //clear
    setSignUpErr("")

    const user = {};
    const emailRegEx = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    user[name] = e.target.value;
    // validations
    switch (name) {
      case 'name':
       
        setname(user.name);
        user.name.length < 3 ? setnameErr('Name must be at least 3 characters!') : setnameErr('');
        break;
      case 'email':
        
        setemail(user.email);
        !emailRegEx.test(user.email) ? setemailErr('Invalid Email!') : setemailErr('');
        break;
      case 'password':
        setpassword(user.password);
       
        user.password.length < 6 ? setpasswordErr('Password must be at least 6 characters!') : setpasswordErr('');
        break;
      case 'confPassword':
        setconfPassword(user.confPassword);
        user.confPassword !== password ? setconfPasswordErr('Passwords do not match!') : setconfPasswordErr('');
        break;
      default:
        break;
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();

    
    
    if (name && email && password && confPassword && !nameErr && !emailErr && !passwordErr && !confPasswordErr) {

             //clear
          setSignUpErr("")
            
    try {
      const res = await fetch('/user/signup', { 
            method: 'POST', 
            body: JSON.stringify({ name, email, password }),
            headers: {'Content-Type': 'application/json',
                    credentials: 'include'
            },  
         
        
      });
      const data = await res.json();
      // console.log(data);

      if (data.errors) {
           
            setSignUpErr(data.errors)
       
      }
      if (data.user) {

            localStorage.setItem('firstLogin', true)
            // console.log("T",data.accesstoken);
            setAccessToken(data.accesstoken)

            history.push("/products")
            // window.location.href = "/products"
       
      
      }

    }
    catch (err) {
      console.log(err.message);
    }


    }
  }
  
  return (
        <div className="container ">

        <div className="row mt-5  justify-content-center align-items-center " >

          <div className="col-xs-12 sign-in " >
              <h2 className="text-center">Create an Account</h2>
                          
              {signUpErr && <div className="alert alert-danger text-center">
                <span className="text-danger text-capitalize">{signUpErr}</span>
                </div>}
              <form className="mt-4" onSubmit={handleSignUp}>
                <div className="form-group">
                  <label htmlFor="name">Enter Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className={ nameErr ? "form-control is-invalid":
                          !nameErr && name.length ? "form-control is-valid": "form-control"
                      }
                  
                    id="name"
                    placeholder="Full Name"
                    onChange={(e) => handleChange(e, 'name')}
                  />
                  {nameErr && <small className="text-danger">{nameErr}</small>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Enter Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className={ emailErr ? "form-control is-invalid":
                          !emailErr && email.length ? "form-control is-valid":"form-control"
                      }
                    
                    id="email"
                    placeholder="Email Address"
                    onChange={(e) => handleChange(e, 'email')}
                  />
                  {emailErr && <small className="text-danger">{emailErr}</small>}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Enter Password</label>
                  <input
                    type="password"
                    name="password"
                    className={ passwordErr ? "form-control is-invalid":
                          !passwordErr && password.length ? "form-control is-valid": "form-control"
                      }
                
                    id="password"
                    placeholder="Password"
                    onChange={(e) => handleChange(e, 'password')}
                  />
                  {passwordErr && <small className="text-danger">{passwordErr}</small>}
                </div>
                <div className="form-group">
                  <label htmlFor="Confirm Password">Confirm Password</label>
                  <input
                    type="password" 
                    name="confPassword"
                    className={ confPasswordErr ? "form-control is-invalid":
                            
                          !confPasswordErr && !passwordErr && confPassword  ? "form-control is-valid": "form-control"
                      }
                
                    id="confPassword"
                    placeholder="Password"
                    onChange={(e) => handleChange(e, 'confPassword')}
                  />
                  {confPasswordErr && <small className="text-danger">{confPasswordErr}</small>}
                </div>
                <input type="submit" className="btn btn-primary" value="Sign Up"/>
              </form>
              <p className="float-left">
              
                  Already have an account?<Link to='/login'>Log In</Link>
              </p>
     
    </div>
    </div>
    </div>
  )
}

export default Register
