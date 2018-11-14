<template>
  <div class="padding:10px">
    <button type="button" class="success button"><router-link :to="{name:'topics'}">go back</router-link></button>
    <div class="card-divider" >
      <h2 v-html="detail.title" ></h2>
    </div>
    <div>
      <!--<h4>This is a card.</h4>-->
      <p v-html="detail.content"></p>
    </div>
  </div>
</template>

<script>
  import * as $ from 'jquery'
    export default {
        name: "detail",
      data(){
          return {
            detail:{},
            id:this.$route.params.id
          }
      },
      methods:{
        getTopicDetail(){
          $.get('/api/topic/describeTopic',{id:this.id}).then(res=>{
            if(res.code === 200 && res.result){
              this.detail = res.result.data
            }
          }).catch(err=>{

          })
        }
      },
      mounted() {
        this.getTopicDetail()
      },
    }
</script>

<style scoped>

</style>
