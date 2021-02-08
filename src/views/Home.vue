<template>
  <div class=" row home p-0 m-0">
    <div class="col-md-3 p-0">
      <Sidebar 
        :cars = "cars"
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
    <BreakDownTable />
      
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import CarDetails from "../components/CarDetails";
import apiService from '../services/api.service'
import MaintenanceTable from '../components/MaintenanceTable'
import BreakDownTable from '../components/BreakDownTable'

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
      showMaintenancesHome: false
    } 
  },
  methods: {
    async getUserCars() {

      try {
        let resp = await apiService.getUserCars()
        console.log(resp.data.userCars[0].user._id)
        this.cars = resp.data.userCars
        console.log(this.cars)
      } catch (error) {
        console.log(error.response)
      }

    },
    async getCarDetailsById(carId) {
      try {
        let resp = await apiService.getCarDetails(carId)
        console.log(resp.data.carDb.maintenance)
        this.car = resp.data.carDb
        this.maintenances = resp.data.carDb.maintenance
                
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
        this.getUserCars()
      } catch (error) {
        console.log(error.response)
      }

    }

  },
  mounted() {
    this.getUserCars()
  }
}
</script>
