<template>
<!-- <div class="container-fluid"> -->
  
<div class="row justify-content-center p-0 m-0" >
  
  <div class="col-md-4 p-5">
    <Form @submit="login" v-slot="{ errors }">
    <div class="form-group text-left">
      <label for="exampleInputEmail1">Email</label>
      <Field
        v-model="email"
        name="email"
        type="email"
        as="input"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        :rules="validateEmail"
      />
      <span class="colorWarning"> {{errors.email}} </span>
      <small id="emailHelp" class="form-text text-muted text-left"
        >No compartiremos tu email con nadie.</small
      >
    </div>
    <div class="form-group text-left">
      <label for="exampleInputPassword1">Password</label>
      <Field
        v-model="password"
        name="password"
        type="password" 
        as="input"
        class="form-control" 
        id="exampleInputPassword1" 
        :rules="validatePassword"
      />
      <span class="colorWarning" > {{errors.password}} </span>
    </div>
    <div class="form-group text-left">

      <p>¿Todavía no tienes cuenta? <router-link to="/register">Regístrate!</router-link></p>
    </div>
    <p v-if="error" class="alert alert-danger">Error al introducir el mail o la contraseña</p>
    <button type="submit" class="btn btn-block btn-outline-primary" >Login</button>
    </Form>
  </div>


</div>
<!-- </div> -->
</template>

<script>
import authService from '../services/auth.service'
import { Field, Form } from 'vee-validate'

export default {
  components: {
    Field,
    Form
  },
  data() {
    return {
      email: '',
      password: '',
      error: false
    }
  },

  methods: {

    validateEmail(value) {

      if (!value) return 'Campo obligatorio'
      
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Introduce un email válido'
      }

      return true
    },

    validatePassword(value) {
      return value ? true : 'Campo obligatorio' 
    },

    async login() {
      try {
        const resp =await authService.login( this.email, this.password )
        console.log('Login correcto, ', resp.data)
        const token = resp.data.token
        await authService.setLoggedInUser(token)
        this.error = false
        this.$router.push('/')
      } catch (err) {
        console.log(err.response.data)
        this.error = true
      }      
    }
  }
  
}
</script>

<style scoped>
  .colorWarning {
    color: red;
  }
</style>