<template>
  <div class="filter-bar">
    <slot></slot>
  </div>
</template>

<script>
    export default {
      props:{
        value:String
      },
      data(){
        return {
          inputValue:this.value
        }
      },
      methods:{
        selectItem(id){
          this.inputValue = id
          this.$emit('input', id)
        }
      }
    }
</script>
