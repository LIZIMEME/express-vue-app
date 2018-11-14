<template>
   <div class="con">
       <div style="padding:10px">
         <span v-for="tab in tabList" @click="changeTab(tab.name)" class="label" :class="tab.class" style="margin-right: 10px;cursor: pointer">{{tab.name}}</span>
       </div>
     <div class="row">
       <div v-for="item in topicList" class="card columns small-2 large-4" style="margin: 10px">
         <div class="card-divider" >
            <router-link v-html="item.title" :to="{name:'topicDetail',params:{id:item.id}}"></router-link>
         </div>
         <div >
           <!--<h4>This is a card.</h4>-->
           <p v-html="item.content"></p>
         </div>
       </div>
     </div>
   </div>
</template>
<script>
    import * as $ from 'jquery'
    export default {
        data(){
            return {
              topicList:[],
              limit:10,
              page:1,
              totalCount:0,
              tab:'ask',
              tabList:[
                {
                  name:'ask',
                  class:'primary'
                },
                {
                  name:'share',
                  class:'secondary'
                },
                {
                  name:'job',
                  class:'success'
                },
                {
                  name:'good',
                  class:'alert'
                }
              ]
            }
        },
        methods:{
          changeTab(name){
            this.tab = name
            this.getTopicList()
          },
            getTopicList(){
                $.get('/api/topic/describeTopics',{
                  page:this.page,
                  limit:this.limit,
                  tab:this.tab,
                  mdrender:true
                }).then(res=>{
                  if(res.code === 200 && res.result){
                    this.topicList = res.result.data
                  }

                }).catch(err=>{

                })
            }
        },
        mounted() {
            this.getTopicList()
        },
    }
</script>
