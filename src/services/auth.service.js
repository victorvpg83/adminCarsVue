import axios from 'axios'

// const BASE_URL = "https://reqres.in/api"

const BASE_URL2 = "http://localhost:3000/api"

export default {

    setLoggedInUser(loggedUser){
        localStorage.setItem('token', loggedUser)
        console.log('token almacenado en localStorage')
    },

    getLoggedInUser() {
        return localStorage.getItem('token')
    },

    login( email, password) {
        const user = { email, password }
        console.log(user)
        return axios.post( `${BASE_URL2}/login`, user) 
    },

    register(name, surname, email, password) {
        const user = {name, surname, email, password}
        console.log(user)
        return axios.post(`${BASE_URL2}/users`, user)
    }
}