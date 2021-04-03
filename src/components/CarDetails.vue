<template>
    <h1 class="animate_animated animate__fadeInDownBig">prueba</h1>
        <div v-if="!car.brand" class="alert alert-warning mt-4" role="alert">
            <h1 v-if="!car.brand" >Selecciona un vehículo o crea uno nuevo</h1>
        </div>
    <div class="mt-4 divShadow pt-3 " v-if="car.model">
        <h1 class="mb-5" v-if="car.model" >Detalles del vehículo</h1>
        <!-- <h1 v-if="!car.brand" >Selecciona un vehículo o crea uno nuevo</h1> -->
        <div class="row" >
            <div class="col-md-5">
                <div class="row">
                    <div class="col-md-4 text-right" >
                        <p v-if="car.brand" class="borderw p-2"> <strong>Marca:</strong> </p>
                        <p v-if="car.motor" class="borderw p-2"> <strong>Motor:</strong> </p>
                        <p v-if="car.year" class="borderw p-2"> <strong>Año:</strong> </p>
                    </div>
                    <div class="col-md-8 text-left">
                        <p v-if="car.brand" class="border p-2">{{car.brand}} </p>
                        <p v-if="car.motor" class="border p-2">{{car.motor}} </p>
                        <p v-if="car.year"  class="border p-2">{{car.year}} </p>
                    </div>
                </div>
            </div>
            <div class="col-md-5">
                <div class="row">
                    <div class="col-md-4 text-right">
                        <p v-if="car.model" class="borderw p-2" > <strong>Modelo:</strong> </p>
                        <p v-if="car.fuel" class="borderw p-2" ><strong>Combustible:</strong></p>
                        <p v-if="car.plate" class="borderw p-2" ><strong>Matrícula:</strong></p>
                    </div>
                    <div class="col-md-8 text-left">
                        <p v-if="car.model" class="border p-2">{{car.model}} </p>
                        <p v-if="car.fuel" class="border p-2">{{car.fuel}} </p>
                        <p v-if="car.plate" class="border p-2">{{car.plate}} </p>
                    </div>
                </div>
            </div>
            <div class="col-md-2" v-if="car.brand">
                <div class="row">
                    <button class="btn btn-primary btn-block mr-4 mb-2" data-toggle="modal" data-target="#editCarModal" @click="addEditCar(car)" > Editar vehículo </button>
                </div>
                <div class="row">
                    <button class="btn btn-danger btn-block mr-4" @click="warningDeleteCar(car._id)" > Eliminar vehículo </button>
                </div>
            </div>
        </div>
        <div class="row">
                    <div class="col mb-3">
                        <button class="btn btn-outline-primary" @click="showMaintenances()"> Mantenimientos </button>
                    </div>
                    <div class="col mb-3">
                        <button class="btn btn-outline-primary" @click="showMaintenances()"> Averías </button>
                    </div>
                </div>
    </div>

    <!-- edit car -->
<!-- Modal -->
    <Form @submit="sendEditCar(car._id)" v-slot="{ errors }">
        <div class="modal fade" id="editCarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Editar vehículo</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        <div class="row">
            <div class="col-md-6">
                <div class="form-group text-left">
                    <label for="editCarBrand">Marca: (*)</label>
                    <Field
                        v-model="editCar.brand"
                        name="brand"
                        as="input"
                        type="text" 
                        class="form-control" 
                        id="editCarBrand"
                        :rules="isRequired" 
                    />
                    <span class="colorWarning"> {{ errors.brand }} </span>
                </div>

            </div>
            <div class="col-md-6">
                <div class="form-group text-left">
                    <label for="editCarModel">Modelo: (*)</label>
                    <Field
                        v-model="editCar.model"
                        name="model"
                        as="input"
                        type="text" 
                        class="form-control" 
                        id="editCarModel" 
                        :rules="isRequired"
                    />
                    <span class="colorWarning"> {{ errors.model }} </span>
                </div>

            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group text-left">
                    <label for="editCarMotor">Motor:</label>
                    <input
                        v-model="editCar.motor"
                        type="text" 
                        class="form-control" 
                        id="editCarMotor" 
                    />
                </div>

            </div>
            <div class="col-md-6">
                <div class="form-group text-left">
                    <label for="editCarYear">Año:</label>
                    <input
                        v-model="editCar.year"
                        type="text" 
                        class="form-control" 
                        id="editCarYear" 
                    />
                </div>

            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group text-left">
                    <label for="editCarFuel">Combustible</label>
                    <input
                        v-model="editCar.fuel"
                        type="text" 
                        class="form-control" 
                        id="editCarFuel" 
                    />
                </div>

            </div>
            <div class="col-md-6">
                <div class="form-group text-left">
                    <label for="editCarPlate">Matrícula</label>
                    <input
                        v-model="editCar.plate"
                        type="text" 
                        class="form-control" 
                        id="editCarPlate" 
                    />
                </div>

            </div>
        </div>      
            <div class="col text-left">
                <small>(*) Campos obligatorios</small>

            </div>
        

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="submit" class="btn btn-primary" >Guardar</button>
        <!-- <button type="button" class="btn btn-primary" @click="sendEditCar(car._id)" data-dismiss="modal" >Guardar</button> -->
      </div>
    </div>
  </div>
        </div>

    </Form>
  
</template>

<script>
import apiService from '../services/api.service'
import Swal from 'sweetalert2'
import { Form, Field } from 'vee-validate'

export default {
    name: 'CarDetails',
    emits: ['refreshcars', 'refreshacar', 'showmaintenances'],
    components: {
        Form,
        Field
    },
    props: {
        car: Object,
    },
    data() {
        return {
            editCar: {}

        }
    },
    methods: {

        isRequired(value) {
            return value ? true : 'Campo obligatorio'
        },

        addEditCar(car) {
            console.log(car)
            this.editCar.brand = car.brand
            this.editCar.model = car.model
            this.editCar.motor = car.motor
            this.editCar.year = car.year
            this.editCar.fuel = car.fuel
            this.editCar.plate = car.plate
        },
        async sendEditCar(carId) {
            try {
                console.log(carId)
                const resp = await apiService.editCar(carId, this.editCar)
                this.$emit('refreshcars')
                this.$emit('refreshacar', carId)
                console.log(resp)
            } catch (err) {
                console.log(err.response.data)
            }        
        },

        showMaintenances() {
            this.$emit('showmaintenances')
        },

        warningDeleteCar(carId) {
                Swal.fire({
                  title: 'Estás Seguro?',
                  text: `Vas a eliminar el vehículo`,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Eliminar',
                  cancelButtonText: 'Cancelar'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.deleteCar(carId)
                  }
                })
        },

        async deleteCar(carId) {
            try {
                const resp = await apiService.deleteCar(carId)
                console.log(resp)
                this.$emit('refreshcars')
                Swal.fire({
                      title:'Eliminado!',
                      text: 'El vehículo ha sido eliminado.',
                      icon:'success',
                      timer: 1500,
                      showConfirmButton: false,
                })
            } catch (err) {
                console.log(err.response)
            }
        }
    }
}
</script>

<style scoped>
.flag {
    width: 100%;
}

.colorWarning {
    color: red;
  }

.border {
    border: 1px solid gray;
}
.borderw {
    border: 1px solid white;
}
.margin {
    margin-bottom: 1rem;
}
.divShadow {
    box-shadow: 2px 2px 5px #666;
}



</style>