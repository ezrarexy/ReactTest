export const storeUserData = (data) => {
	localStorage.setItem('token',data)
}

export const getUserData = () => {
	return localStorage.getItem('token')
}

export const clearToken = () => {
	localStorage.clear();
}