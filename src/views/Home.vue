<template>
  <div class=" row home p-0 m-0">
    <div class="col-md-3 p-0">
      <Sidebar 
        :cars = "cars"
        :loading = "loading"
        @click="getCarDetailsById"
        v-on:newcardata="createNewCar"
      />
    </div>
    <div class="col-md-9">

    <CarDetails 
      :car = "car" 
      v-on:refreshcars="getUserCars"
      v-on:refreshacar="getCarDetailsById"
      v-on:showmaintenances="showMaintenances"
    />
    <MaintenanceTable :maintenances = "maintenances" :car = "car" :showMaintenancesHome = "showMaintenancesHome" />
    <BreakDownTable :breakdowns = "breakdowns" :car = "car" />
      
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import CarDetails from "../components/CarDetails";
import apiService from '../services/api.service'
import MaintenanceTable from '../components/MaintenanceTable'
import BreakDownTable from '../components/BreakDownTable'

import Swal from 'sweetalert2'

import moment from 'moment'

export default {
  name: 'Home',
  components: {
    Sidebar,
    CarDetails,
    MaintenanceTable,
    BreakDownTable
  },
  data () {
    return {
      cars: null,
      car: {},
      maintenances: null,
      breakdowns: null,
      showMaintenancesHome: false,
      loading: false
    } 
  },
  methods: {
    async getUserCars() {
      this.loading = true
      
      try {
        let resp = await apiService.getUserCars()
        console.log(resp.data.userCars[0].user._id)
        this.cars = resp.data.userCars
        console.log(this.cars)
        this.loading = false
      } catch (error) {
        console.log(error.response)
        this.loading = false
      }

    },
    async getCarDetailsById(carId) {
      try {
        let resp = await apiService.getCarDetails(carId)
        this.car = resp.data.carDb
        const m = resp.data.carDb.maintenance
        m.map(m => {
          if (!m.date) return
          m.date = moment(m.date).format('DD-MM-YYYY')
        })
        console.log( 'mantenimientos',m);
        this.maintenances = m
        
                
      } catch (error) {
        console.log(error.response)
      }
    },

    showMaintenances() {
      console.log('maintenances')
      this.showMaintenancesHome = !this.showMaintenancesHome
      console.log(this.showMaintenancesHome)

    },

    async createNewCar(newCar) {
      // console.log(newCar)
      try {
        let resp = await apiService.createCar(newCar)
        console.log(resp.data)
        Swal.fire({
          title: "¡Vehículo creado!",
          text: `El vehículo se ha creado correctamente`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        this.getUserCars()
      } catch (error) {
        console.log(error.response)
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.msg}`,
          icon: "error",
          showConfirmButton: true,
        });
      }

    }

  },
  mounted() {
    this.getUserCars()
  }
}
</script>
