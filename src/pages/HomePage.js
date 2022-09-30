import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { isAuthenticated } from '../services/Auth';
import { Navigate } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { storeUserData, getUserData, clearToken } from '../services/Storage';
import { LogOutApi, getStudents, delStudent } from '../services/API';


export default function HomePage() {
	const navigate = useNavigate();
	const [userList, setUserList] = useState([]);
	const token = getUserData();

	useEffect(() => {
		fetch('//localhost:8000/api/students', {
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

	if ( !isAuthenticated() ) {
		return <Navigate to="/login" />
	}

	const handleClick = (e) => {
		e.preventDefault();
		clearToken();
		navigate('/login');
	};



	const handleDelete = (id) => {
		delStudent(id).then( (response) => {
				window.location.reload(false);
			}).catch( (err) => {
				console.log(err);
			}).finally( () => {
			});
	} 



	return (

		<div className="container container-fluid mt-5">

			<nav className="navbar navbar-expand-lg bg-light">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">Navbar scroll</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarScroll">
						<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="#">Home</a>
							</li>
						</ul>
						<div className="d-flex">
							<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
								<li className="nav-item">
									<a className="nav-link" onClick={handleClick} href="#">SignOut</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>

			<div className="mt-5">
				<div className="">
					<Link to={`/add`}>
						<button className="btn btn-primary onClick={handleClick} float-right align-right float-end"><span className="glyphicon glyphicon-plus"></span> Add</button>
					</Link>
				</div>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>ID</th>
							<th>Avatar</th>
							<th>Name</th>
							<th>Gender</th>
							<th>DoB</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							userList && userList.length > 0 ?
							userList.map(students => 
								<tr id={"std"+students.id} data-id={students.id} data-avatar={students.avatar_url} data-name={students.name} data-gender={students.gender} data-dob={students.dob}>
									<td>{students.id}</td>
									<td>{students.avatar_url}</td>
									<td>{students.name}</td>
									<td>{students.gender}</td>
									<td>{students.dob}</td>
									<td>
										<Link to={`/edit/`+students.id}> 
											<button className="btn btn-primary">Edit</button> 
										</Link>
										&nbsp;
										<button className="btn btn-danger" onClick={() => handleDelete(students.id)}>Delete</button> 
									</td>
								</tr>
							) : <tr><td colSpan="6"><span className="align-center">Loading . . .</span></td></tr>
						}
					</tbody>
				</table>
			</div>
		</div>

	)
}