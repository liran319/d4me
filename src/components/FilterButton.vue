<template>
  <div :class="{'filter-button':true, is_asc:is_asc,is_desc:is_desc, selected:$parent.inputValue==id||$parent.inputValue==('-'+id)}" @click="onClick">
    <span>{{title}}</span>
  </div>
</template>

<script>
    export default {
      props:{
        id:String,
        title:String,
        asc:Boolean
      },
      computed:{
        is_asc(){
          return this.asc
        },
        is_desc(){
          return this.asc&&this.$parent.inputValue==('-'+this.id)
        }
      },
      methods:{
        onClick(){
          if(this.asc&&this.$parent.inputValue == this.id){
            this.$parent.selectItem('-'+this.id);
          }else{
            this.$parent.selectItem(this.id);
          }
        }
      }
    }
</script>
