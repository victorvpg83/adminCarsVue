import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api'

export default {
    get token() {
        return localStorage.getItem('token')
    },

    get headers() {
        return {
            headers: this.token
        }
    },

    createCarMaintenance(carMaintenance) {
        return axios.post(`${BASE_URL}/maintenance`, carMaintenance, {
            headers: {
                'x-token': this.token
            }
        })
    },

    deleteCarMaintenance(maintenanceId) {
        return axios.delete(`${BASE_URL}/maintenance/${maintenanceId}`, {
            headers: {
                'x-token': this.token
            }
        })
    },

    editCarMaintenance(maintenanceId, carMaintenanceUpdate) {
        return axios.put(`${BASE_URL}/maintenance/${maintenanceId}`, carMaintenanceUpdate, {
            headers: {
                'x-token': this.token
            }
        })
    }


}