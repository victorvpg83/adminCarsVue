<template>
    <!-- <iframe src="https://www.realoem.com/" frameborder="3"></iframe> -->
<div class="divShadow mt-3">


  <!-- <div class="pt-3">
    <h1 >Averías</h1> -->
    <!-- <h1 >Añadir avería</h1>
    <h1>Editar avería</h1> -->
    <!-- <button
      class="btn btn-primary mb-3"
    >
      Añadir avería
    </button>
  </div> -->


</div>
</template>

<script>
export default {
name: "BreakDownTable",
props: {
    breakdowns: Array,
    car: Object
}
}
</script>

<style scoped>

.divShadow {
    box-shadow: 2px 2px 5px #666;
}

</style>