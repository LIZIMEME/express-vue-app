<template>
   <div>
       <ul>
           <li v-for="item in topicList">
             <h2 v-html="item.title"></h2>
             <p v-html="item.content"></p>
           </li>
       </ul>
   </div>
</template>
<script>
    import * as $ from 'jquery'
    export default {
        data(){
            return {
                topicList:[]
            }
        },
        methods:{
            getTopicList(){
                $.get('/api/topic/describeTopics',{
                  page:1,
                  limit:10,
                  tab:'ask',
                  mdrender:true
                }).then(res=>{
                  if(res.code === 200 && res.result){
                    this.topicList = res.result.data
                  }

                }).catch(err=>{

                })
            }
        },
        computed:{

        },
        mounted() {
            this.getTopicList()
        },
    }
</script>
