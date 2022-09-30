import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { storeUserData } from '../services/Storage';
import { isAuthenticated } from '../services/Auth';
import { Navigate, Redirect  } from 'react-router-dom';
import { Link, useNavigate, useParams } from "react-router-dom";
import { clearToken } from '../services/Storage';
import { LogOutApi } from '../services/API';
import { addStudent } from '../services/API';
import { editStudent } from '../services/API';
import { getUserData } from '../services/Storage';

export default function EditStudentPage() {
	const navigate = useNavigate();
	const [userList, setUserList] = useState([]);
	const token = getUserData();
	const {id} = useParams();

	useEffect(() => {
		fetch('//localhost:8000/api/students/'+id, {
			method: 'GET',
			headers: {
				'Content-Type':'application/json',
				'Authorization':`Bearer ${token}`
			}
		})
			.then(response => response.json())
			.then(result => setUserList(result))
			.catch(error => console.log)
	}, []);

	const handleClick = (e) => {
		e.preventDefault();
		clearToken();
		navigate('/login');
	};

	const initialStateErrors = {
		name:{required:false},
		gender:{required:false},
		dob:{required:false}
	};

	const [errors, setErrors] = useState(initialStateErrors);
	const [loading, setLoading] = useState(false);


	const handleSubmit = (e) => {

		e.preventDefault();
		let errors = initialStateErrors;
		let hasError = false;

		if (inputs.name == "") {
			errors.name.required = true;
			hasError = true;
		}
		if (inputs.gender == "") {
			errors.gender.required = true;
			hasError = true;
		}
		if (inputs.dob == "") {
			errors.dob.required = true;
			hasError = true;
		}

		if (hasError!=true) {
			setLoading(true);
			editStudent(inputs,id).then( (response) => {
				window.location.reload(false);
			}).catch( (err) => {
				console.log(err);
			}).finally( () => {
				setLoading(false);
			})
		}
		console.log(inputs);
		setErrors(errors);
	}

	const [inputs, setInputs] = useState({
		avatar_url:"",
		name:"",
		gender:"",
		dob:""
	});

	const handleInput = (e) => {
		setInputs({...inputs,[e.target.name]:e.target.value});
	}

	if ( !isAuthenticated() ) {
		return <Navigate to="/login" />
	}

	const name = userList.name;
	const gender = userList.gender;
	const dob = userList.dob;
	const avatar_url = userList.avatar_url;

	return (
		<div className="container container-fluid mt-5 pb-3">

			<nav className="navbar navbar-expand-lg bg-light">
				<div className="container-fluid">
					<a className="navbar-brand" >Navbar scroll</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarScroll">
						<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
							<li className="nav-item">
								<Link to={`/home`}>
									<a className="nav-link" aria-current="page" >Home</a>
								</Link>
							</li>
						</ul>
						<div className="d-flex">
							<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
								<li className="nav-item">
									<a className="nav-link" onClick={handleClick}>SignOut</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>


			<div className="container mt-5 pb-5">
				<form onSubmit={handleSubmit}>
					<input name="id" defaultValue={id} hidden />
					<input type="text" className="form-control input mb-2" name="name" onChange={handleInput} defaultValue={name} id="" placeholder="Name" required/>
					
					<div className="btn-group mb-2" role="group" aria-label="Choose gender" required>
						<input type="radio" onChange={handleInput} className="btn-check" name="gender" id="btnradio1" value="M" checked={gender=="M" ? 'checked' : 'unchecked'} autoComplete="off"/>
						<label className="btn btn-outline-primary" htmlFor="btnradio1">Male</label>

						<input type="radio" onChange={handleInput} className="btn-check" name="gender" id="btnradio2" value="F" checked={gender=="F" ? 'checked' : 'unchecked'} autoComplete="off"/>
						<label className="btn btn-outline-primary" htmlFor="btnradio2">Female</label>
					</div>

					<input type="date" className="form-control input mb-2" name="dob" onChange={handleInput} id="" defaultValue={dob} placeholder="DoB" required/>
					<input type="text" className="form-control input mb-2" name="avatar_url" onChange={handleInput} id="" defaultValue={avatar_url}  placeholder="Link Avatar" />
					<input type="submit" className="btn btn-primary float-end" />
				</form>
			</div>


		</div>
	)
}