import axios from "axios";
import { getUserData } from '../services/Storage';

export const LoginApi = (inputs) => {
	let data = {email:inputs.email,password:inputs.password}
	return axios.post('//localhost:8000/api/signin',data)
}

export const LogOutApi = () => {
	return axios.get('//localhost:8000/api/signout')
}

export const getStudents = () => {
	const token = getUserData();
	const res = axios.get(
		'//localhost:8000/api/students', 
		{ 
			headers: { 
				Authorization: `Bearer ${token}` 
			} 
		});
	return res;
}

export const addStudent = (inputs) => {
	const token = getUserData();
	let data = {name:inputs.name,gender:inputs.gender,dob:inputs.dob,avatar_url:inputs.avatar_url}
	return axios.post(
		'//localhost:8000/api/students',
		data,
		{ 
			headers: { 
				Authorization: `Bearer ${token}` 
			} 
		});
}

export const delStudent = (id) => {
	const token = getUserData();
	let data = {id:id}
	const res = axios.delete(
		'//localhost:8000/api/students/'+id,
		{ 
			headers: { 
				Authorization: `Bearer ${token}` 
			} 
		});
	return res;
}

export const editStudent = (inputs,id) => {
	const token = getUserData();
	let data = {name:inputs.name,gender:inputs.gender,dob:inputs.dob,avatar_url:inputs.avatar_url}
	return axios.put(
		'//localhost:8000/api/students/'+id,
		data,
		{ 
			headers: { 
				Authorization: `Bearer ${token}` 
			} 
		});
}