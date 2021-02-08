<template>
  <!-- <div class="container-fluid"> -->

  <div class="row justify-content-center p-0 m-0">
    <div class="col-md-4 p-5">
      <Form @submit="register" v-slot="{ errors }" >
        <div class="form-group text-left">
          <label for="exampleInputEmail1">Nombre</label>
          <Field
            v-model="name"
            name="name"
            as="input"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            :rules="isRequired"
          />
          <span class="colorWarning"> {{ errors.name }} </span>
        </div>
        <div class="form-group text-left">

          <label for="exampleInputEmail1">Apellidos</label>
          <Field
            v-model="surname"
            name="surname"
            as="input"
            type="text"
            class="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            :rules="isRequired"
          />
          <span class="colorWarning"> {{ errors.surname }} </span>
        </div>
        <div class="form-group text-left">

          <label for="exampleInputEmail1">Email</label>
          <Field
            v-model="email"
            name="email"
            as="input"
            type="email"
            class="form-control"
            id="exampleInputEmail3"
            aria-describedby="emailHelp"
            :rules="validateEmail"
          />
          <span class="colorWarning"> {{ errors.email }} </span>
          <small id="emailHelp" class="form-text text-muted text-left"
            >No compartiremos tu email con nadie.</small
          >
        </div>
        <div class="form-group text-left">
          <label for="exampleInputPassword1">Password</label>
          <Field
            v-model="password"
            name="password"
            as="input"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            :rules="isRequired"
          />
          <span class="colorWarning"> {{ errors.password }} </span>
        </div>
        <p v-if="error" class="alert alert-danger">
          El email introducido ya existe en nuestra base de datos
        </p>
        <div class="form-group text-left">
          <p>¿ya tienes cuenta? <router-link to="/login">Loguéate!</router-link></p>
        </div>
        <button type="submit" class="btn btn-block btn-outline-primary">
          Registrar
        </button>
      </Form>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import authService from "../services/auth.service";
import { Form, Field } from 'vee-validate'

export default {

  components: {
    Form,
    Field
  },

  data() {
    return {
      name: "",
      surname: "",
      email: "",
      password: "",
      error: false,
    };
  },

  methods: {

    isRequired(value) {
      return value ? true : 'Campo obligatorio'
    },

    validateEmail(value) {

      if (!value) return 'Campo obligatorio'
      
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Introduce un email válido'
      }

      return true
    },

    async register() {
      try {
        const resp = await authService.register(
          this.name,
          this.surname,
          this.email,
          this.password
        );
        console.log("Registro correcto, ", resp.data.token);
        const token = resp.data.token
        await authService.setLoggedInUser(token)
        this.email = ''
        this.password = '',
        this.name = '',
        this.surname = ''
        this.error = false
        this.$router.push('/')
      } catch (err) {
        console.log(err.response.data);
        this.error = true;
      }
    },
  },
};
</script>

<style scoped>

.colorWarning {
    color: red;
  }

</style>