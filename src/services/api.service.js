import  axios  from "axios"

const BASE_URL = 'http://localhost:3000/api'

// let config = {
//     headers: {
//         token: this.token
//     }
// }


export default {

    get token() {
        return localStorage.getItem('token')
    },

    get headers() {
        return {
            headers: this.token
        }
    },

    getUserCars() {
        return axios.get(`${BASE_URL}/car`,{
            headers: {
                'x-token': this.token
            }
        })
    },

    getCarDetails(carId) {
        return axios.get(BASE_URL + `/car/${carId}`, {
            headers: {
                'x-token': this.token
            }
        })
    },

    createCar(newCar) {
        return axios.post(`${BASE_URL}/car`, newCar, {
            headers: {
                'x-token': this.token
            }
        })
    },

    editCar(carId,editCar) {
        return axios.put(`${BASE_URL}/car/${carId}`, editCar, {
            headers: {
                'x-token': this.token
            }
        })
    },

    deleteCar(carId) {
        return axios.delete(`${BASE_URL}/car/${carId}`, {
            headers: {
                'x-token': this.token
            }
        })
    }
}
