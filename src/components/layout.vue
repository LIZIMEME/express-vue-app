<template>
    <div>
      <headerComponent></headerComponent>
      <router-view/>
    </div>
</template>

<script>
  import headerComponent from './headerComponent'
    export default {
        name: "layout",
        components:{headerComponent}
    }
</script>

<style scoped>

</style>
