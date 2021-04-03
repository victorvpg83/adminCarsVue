<template >
<div class="divShadow mt-3">


  <div class="pt-3" v-if="car.brand && showMaintenancesHome">
    <h1 v-if="!showCreateMaintenance && !showUpdateMaintenance">Mantenimientos</h1>
    <h1 v-if="showCreateMaintenance && !showUpdateMaintenance">Añadir Mantenimineto</h1>
    <h1 v-if="showUpdateMaintenance">Editar Mantenimiento</h1>
    <button
      class="btn btn-primary mb-3"
      v-if="!showCreateMaintenance && !showUpdateMaintenance"
      @click="showCreateMaintenance = !showCreateMaintenance"
    >
      Añadir Mantenimiento
    </button>
  </div>

  <!-- add maintenance form -->
  <div v-if="showCreateMaintenance || showUpdateMaintenance">
    <form @submit.prevent="createOrUpdateMaintenance(carMaintenance._id)">
      <div class="row">
        <div class="col-md-3">
          <div class="form-group text-left">
            <label for="maintenanceDate">Fecha</label>
            <input
              type="date"
              v-model="carMaintenance.date"
              class="form-control"
              id="maintenanceDate"
            />
          </div>
          <div class="form-group text-left">
            <label for="km">Kilómetros</label>
            <input
              type="number"
              v-model="carMaintenance.km"
              class="form-control"
              id="km"
            />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group form-check text-left">
            <input type="checkbox" class="form-check-input" id="oil" />
            <label class="form-check-label" for="oil">Aceite</label>
          </div>
          <div class="form-group form-check text-left">
            <input
              type="checkbox"
              v-model="carMaintenance.airFilter"
              class="form-check-input"
              id="airFilter"
            />
            <label class="form-check-label" for="airFilter">Filtro Aire</label>
          </div>
          <div class="form-group form-check text-left">
            <input
              type="checkbox"
              v-model="carMaintenance.fuelFilter"
              class="form-check-input"
              id="fuelFilter"
            />
            <label class="form-check-label" for="fuelFilter"
              >Filtro Combustible</label
            >
          </div>
          <!-- <div class="form-group form-check text-left">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Filtro Polen</label>
          </div> -->
          <div class="form-group form-check text-left">
            <input
              type="checkbox"
              v-model="carMaintenance.timingBelt"
              class="form-check-input"
              id="timingBelt"
            />
            <label class="form-check-label" for="timingBelt"
              >Correa de Distribución</label
            >
          </div>
          
          
        </div>
        <div class="col-md-3">
          <div class="form-group form-check text-left">
            <input
              type="checkbox"
              v-model="carMaintenance.batery"
              class="form-check-input"
              id="batery"
            />
            <label class="form-check-label" for="batery">Batería</label>
          </div>
          <div class="form-group form-check text-left">
            <input
              type="checkbox"
              v-model="carMaintenance.auxBelts"
              class="form-check-input"
              id="auxBelts"
            />
            <label class="form-check-label" for="auxBelts"
              >Correas Auxiliares</label
            >
          </div>
          <div class="form-group form-check text-left">
            <input
              type="checkbox"
              v-model="carMaintenance.sparkPlugs"
              class="form-check-input"
              id="sparkPlugs"
            />
            <label class="form-check-label" for="sparkPlugs">Bujías</label>
          </div>
          <div class="form-group form-check text-left">
            <input
              type="checkbox"
              v-model="carMaintenance.tyres"
              class="form-check-input"
              id="tyres"
            />
            <label class="form-check-label" for="tyres">Ruedas</label>
          </div>
          <div class="form-group text-left">
            <label for="other">Otro:</label>
            <input
              type="text"
              v-model="carMaintenance.other"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6"></div>
        <div class="col-md-6"></div>
      </div>
      <button v-if="showCreateMaintenance" type="submit" class="btn btn-primary mb-3">
        Añadir Mantenimineto
      </button>
      <button v-if="showUpdateMaintenance" type="submit" class="btn btn-primary mb-3">
        Editar Mantenimiento
      </button>
      <button
        type="button"
        class="btn btn-primary mb-3 ml-2"
        @click="cancelMaintenanceBtn()"
      >
        Cancelar
      </button>
    </form>
  </div>

  <!-- end add maintenance -->

  <div v-if="showMaintenancesHome">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Fecha</th>
          <th scope="col">Kilómetros</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(maintenance, index) in maintenances" :key="maintenance._id">
          <th scope="row">{{index + 1}}</th>
          <td>{{maintenance.date}}</td>
          <td>{{maintenance.km}}</td>
          <td>
              <button class="btn btn-primary mr-2" @click="showMaintenanceDetails(maintenance)" type="button" data-toggle="modal" data-target="#exampleModal" aria-expanded="true" >Detalles</button>
              <button class="btn btn-danger" @click="warningDeleteCarMaintenance(maintenance._id)">Eliminar<i class="bi bi-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>


    <!-- maintenance details modal -->

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"> Fecha: {{carMaintenance.date}}, Kilómetros: {{carMaintenance.km}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
          <div class="form-group form-check text-left">
            <input type="checkbox" class="form-check-input" id="oil" />
            <label class="form-check-label" for="oil">Aceite</label>
          </div>
          <div class="form-group form-check text-left">
            <input
              type="checkbox"
              v-model="carMaintenance.airFilter"
              class="form-check-input"
              id="airFilter"
              disabled
            />
            <label class="form-check-label" for="airFilter">Filtro Aire</label>
          </div>
          <div class="form-group form-check text-left">
            <input
              type="checkbox"
              v-model="carMaintenance.fuelFilter"
              class="form-check-input"
              id="fuelFilter"
              disabled
            />
            <label class="form-check-label" for="fuelFilter"
              >Filtro Combustible</label
            >
          </div>
          <!-- <div class="form-group form-check text-left">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Filtro Polen</label>
          </div> -->
          <div class="form-group form-check text-left">
            <input
              type="checkbox"
              v-model="carMaintenance.timingBelt"
              class="form-check-input"
              id="timingBelt"
              disabled
            />
            <label class="form-check-label" for="timingBelt"
              >Correa de Distribución</label
            >
          </div>
          
          
        </div>
        <div class="col-md-6">
          <div class="form-group form-check text-left">
            <input
              type="checkbox"
              v-model="carMaintenance.batery"
              class="form-check-input"
              id="batery"
              disabled
            />
            <label class="form-check-label" for="batery">Batería</label>
          </div>
          <div class="form-group form-check text-left">
            <input
              type="checkbox"
              v-model="carMaintenance.auxBelts"
              class="form-check-input"
              id="auxBelts"
              disabled
            />
            <label class="form-check-label" for="auxBelts"
              >Correas Auxiliares</label
            >
          </div>
          <div class="form-group form-check text-left">
            <input
              type="checkbox"
              v-model="carMaintenance.sparkPlugs"
              class="form-check-input"
              id="sparkPlugs"
              disabled
            />
            <label class="form-check-label" for="sparkPlugs">Bujías</label>
          </div>
          <div class="form-group form-check text-left">
            <input
              type="checkbox"
              v-model="carMaintenance.tyres"
              class="form-check-input"
              id="tyres"
              disabled
            />
            <label class="form-check-label" for="tyres">Ruedas</label>
          </div>
          <div class="form-group text-left">
            <label for="other">Otro:</label>
            <input
              type="text"
              v-model="carMaintenance.other"
              class="form-control"
              id="exampleInputPassword1"
              disabled
            />
          </div>
            </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="showFormMaintenance" data-dismiss="modal">Editar mantenimiento</button>
          </div>
        </div>
      </div>
    </div>

    
  </div>
</div>
</template>

<script>
import maintenanceService from "../services/maintenance.service";
import Swal from "sweetalert2";
// import moment from "moment"

export default {
  name: "MaintenanceTable",
  props: {
    maintenances: Array,
    car: Object,
    showMaintenancesHome: Boolean
  },
  data() {
    return {
      showCreateMaintenance: false,
      showUpdateMaintenance: false,
      carMaintenance: {},
    };
  },
  methods: {
    async createCarMaintenance() {
      this.carMaintenance.car = this.car._id;
      console.log(this.car);
      console.log(this.carMaintenance);
      try {
        let resp = await maintenanceService.createCarMaintenance(
          this.carMaintenance
        );
        console.log(resp.data);
        Swal.fire({
          title: "¡Mantenimiento creado!",
          text: "El mantenimiento ha sido creado correctamente",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        this.showCreateMaintenance = !this.showCreateMaintenance;
      } catch (error) {
        console.log(error.response);
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.msg}`,
          icon: "error",
          showConfirmButton: true,
        });
      }
    },

    warningDeleteCarMaintenance(maintenanceId) {
      Swal.fire({
        title: "¿Estás Seguro?",
        text: `Vas a eliminar el mantenimiento`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteCarMaintenance(maintenanceId);
        }
      });
    },

    async deleteCarMaintenance(maintenanceId) {
      console.log("eliminar mantenimiento: ", maintenanceId);
      try {
        const resp = await maintenanceService.deleteCarMaintenance(maintenanceId);
        Swal.fire({
          title: "¡Mantenimiento eliminado!",
          text: "El mantenimiento ha sido eliminado correctamente",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        console.log(resp.data);
      } catch (error) {
        console.log(error.response);
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.msg}`,
          icon: "error",
          showConfirmButton: true,
        });
      }
    },

    showMaintenanceDetails(maintenance) {
      // console.log(maintenance.date);
      // const df = moment(maintenance.date).format('DD-MM-YYYY')
      // console.log('df ',df)
      // this.carMaintenance.date = df
      this.carMaintenance = maintenance
    },
    transformDate() {
      console.log(this.maintenances)
    },

    async updateCarMaintenance(maintenanceId) {
      try {
        const resp = await maintenanceService.editCarMaintenance(maintenanceId, this.carMaintenance)
        console.log(resp.data)
        Swal.fire({
          title: "¡Mantenimiento actualizado!",
          text: "El mantenimiento ha sido actualizado correctamente",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        this.showUpdateMaintenance = !this.showUpdateMaintenance 
      } catch (error) {
        console.log(error.response)
        Swal.fire({
          title: "Error!",
          text: `${error.response.data.msg}`,
          icon: "error",
          showConfirmButton: true,
        });
      }
    },

    showFormMaintenance() {
      this.showUpdateMaintenance = !this.showUpdateMaintenance 
    },

    cancelMaintenanceBtn() {

      this.showCreateMaintenance = false
      this.showUpdateMaintenance = false

    },
    createOrUpdateMaintenance(maintenanceId) {
      maintenanceId ? this.updateCarMaintenance(maintenanceId) : this.createCarMaintenance()
    }

  },
  
  mounted() {
    this.transformDate()
  },
};
</script>

<style scoped>

.divShadow {
    box-shadow: 2px 2px 5px #666;
}
</style>
