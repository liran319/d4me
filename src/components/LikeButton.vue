<template>
    <div :class="{'like-button':true, active:isActive }" @click="onClick"></div>
</template>

<style lang="scss" src="./LikeButton.scss"></style>

<script>
    export default {
      props:{
        id: Number,
        type: String,
        active: Boolean
      },
      data(){
        return {
          isActive: this.active
        }
      },
      methods:{
        onClick(e){
          var self = this
          this.$store.dispatch(`favs/${this.isActive?'removeFav':'addFav'}`,{
            id: this.id,
            type: this.type
          }).then(function(){
            self.isActive = !self.isActive
          })
          e.stopPropagation()
          e.preventDefault()
        }
      }
    }
</script>
