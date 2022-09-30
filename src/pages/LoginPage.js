import './LoginPage.css';
import { LoginApi } from '../services/API';
import React, { useState, useEffect } from 'react';
import { storeUserData } from '../services/Storage';
import { isAuthenticated } from '../services/Auth';
import { Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom';

export default function LoginPage() {

	const initialStateErrors = {
		email:{required:false},
		password:{required:false},
		custom_error:null
	};
	const [errors, setErrors] = useState(initialStateErrors);
	const [loading, setLoading] = useState(false);



	const handleSubmit = (e) => {
		e.preventDefault();
		let errors = initialStateErrors;
		let hasError = false;

		if (inputs.email == "") {
			errors.email.required = true;
			hasError = true;
		}
		if (inputs.password == "") {
			errors.password.required = true;
			hasError = true;
		}

		if (hasError!=true) {
			setLoading(true);
			LoginApi(inputs).then( (response) => {
				storeUserData(response.data.token);
			}).catch( (err) => {
				console.log(err);
			}).finally( () => {
				setLoading(false)
			})
		}

		setErrors(errors);

	}

	const [inputs, setInputs] = useState({
		email:"",
		password:""
	});

	const handleInput = (e) => {
		setInputs({...inputs,[e.target.name]:e.target.value})
	}

	if (isAuthenticated()) {
		return <Navigate to="/home" />
	}

	return (
        <section className="login-block">
            <div className="container">
                <div className="row ">
                    <div className="col login-sec">
                        <h2 className="text-center">Login</h2>
                        <form onSubmit={handleSubmit} className="login-form" action="">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                            <input type="email"  className="form-control" name="email" onChange={handleInput}  id="" placeholder="email"  />
                            { errors.email.required ? (<span className="text-danger" >Email is required.</span>) : null }
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                            <input  className="form-control" type="password"  name="password" onChange={handleInput} placeholder="password" id="" />
                            { errors.password.required ? (<span className="text-danger" >Password is required.</span>) : null }
                        </div>
                        <div className="form-group">
	                        { loading ? (
	                            <div  className="text-center">
	                                <div className="spinner-border text-primary " role="status">
	                                <span className="sr-only">Loading...</span>
	                                </div>
	                            </div>) : null 
                        	}

                            { errors.custom_error ? (<span className="text-danger" ><p>Custom Error Message!</p></span>) : null }
                            <input  type="submit" className="btn btn-login float-right"  value="Login" />
                        </div>
                        <div className="clearfix"></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
	)
}