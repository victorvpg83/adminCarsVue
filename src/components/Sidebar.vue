<template>
  <div class="mt-3" v-if="!loading">
    <h2>Mis vehículos</h2>
  </div>
  <div v-if="loading" class="mt-5" >
    <font-awesome-icon :icon="spinner" spin size="2x" />
  </div>
  <div v-if="!loading">
    <button
      class="btn btn-primary btn-block mb-2"
      data-toggle="modal"
      data-target="#addCarModal"
    >
    <font-awesome-icon :icon="myIcon" />
      Añadir vehículo
    </button>
    <i class="bi bi-trash"></i>
    <!-- <font-awesome-icon icon="home"/> -->
    <ul class="list-group">
      <li
        class="list-group-item"
        @click="getCarDetailsById(car._id)"
        v-for="car in cars"
        :key="car._id"
      >
        <a> {{ car.brand }} - {{ car.model }} </a>
      </li>
    </ul>
  </div>
  <!-- modal new car -->

  <Form @submit="addNewCar" v-slot="{ errors }">
    <div
      class="modal fade"
      id="addCarModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Añadir vehículo nuevo
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group text-left">
                  <label for="newCarBrand">Marca: (*)</label>
                  <Field
                    v-model="newCar.brand"
                    name="brand"
                    as="input"
                    type="text"
                    class="form-control"
                    id="newCarBrand"
                    :rules="isRequired"
                  />
                  <span class="colorWarning"> {{ errors.brand }} </span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group text-left">
                  <label for="newCarModel">Modelo: (*)</label>
                  <Field
                    v-model="newCar.model"
                    name="model"
                    as="input"
                    type="text"
                    class="form-control"
                    id="newCarModel"
                    :rules="isRequired"
                  />
                  <span class="colorWarning"> {{ errors.model }} </span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group text-left">
                  <label for="newCarMotor">Motor:</label>
                  <input
                    v-model="newCar.motor"
                    type="text"
                    class="form-control"
                    id="newCarMotor"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group text-left">
                  <label for="newCarYear">Año:</label>
                  <input
                    v-model="newCar.year"
                    type="text"
                    class="form-control"
                    id="newCarYear"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group text-left">
                  <label for="newCarFuel">Combustible</label>
                  <input
                    v-model="newCar.fuel"
                    type="text"
                    class="form-control"
                    id="newCarFuel"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group text-left">
                  <label for="newCarPlate">Matrícula</label>
                  <input
                    v-model="newCar.plate"
                    type="text"
                    class="form-control"
                    id="newCarPlate"
                  />
                </div>
              </div>
            </div>
            <div class="col text-left">
              <small>(*) Campos obligatorios</small>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary" >Guardar</button>
            <!-- <button type="button" class="btn btn-primary" @click="addNewCar" data-dismiss="modal" >Guardar</button> -->
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>
<script>
import { mapState } from "vuex";
import { Form, Field } from "vee-validate";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCar, faSpinner } from '@fortawesome/free-solid-svg-icons'

export default {
  name: "SideBar",
  emits: ["click", "newcardata"],
  props: {
    cars: Array,
    loading: Boolean
  },
  components: {
    Form,
    Field,
    FontAwesomeIcon
  },
  data() {
    return {
      newCar: {
        brand: "",
        model: "",
        motor: "",
        year: "",
        fuel: "",
        plate: "",
      },
      myIcon: faCar,
      spinner: faSpinner,
    };
  },
  computed: {
    ...mapState(["cars"]),
  },

  methods: {
    isRequired(value) {
      return value ? true : "Campo obligatorio";
    },

    getCarDetailsById(carId) {
      this.$emit("click", carId);
      console.log("carId: " + carId);
    },
    addNewCar() {
      console.log(this.newCar);
      this.$emit("newcardata", this.newCar)
      
    },
  },
};
</script>

<style scoped>
.colorWarning {
  color: red;
}
</style>
