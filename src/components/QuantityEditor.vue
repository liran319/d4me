<template>
    <div class="quantity-editor">
      <div class="content">
        <div class="button" @click="minus">-</div>
        <input type="text" v-int :value="defaultValue" @input="onChange"/>
        <div class="button" @click="add">+</div>
      </div>
    </div>
</template>

<style lang="scss" src="./QuantityEditor.scss"></style>

<script>
    export default {
      props:{
        value:Number
      },
      data(){
        return {
          defaultValue:this.value||0
        }
      },
      methods:{
        add(){
          this.defaultValue++
          this.$emit('change', this.defaultValue||0)
        },
        minus(){
          if(this.defaultValue>1){
            this.defaultValue--
            this.$emit('change', this.defaultValue||0)
          }
        },
        onChange(e){
          this.$emit('change', e.target.value||0)
        }
      },
      watch:{
        value(v){
          this.defaultValue = v
        }
      }
    }
</script>
