<template>
  <a class="city-picker mint-cell mint-field"  @click="openPicker">
    <div class="mint-cell-wrapper">
      <div class="mint-cell-title"><span class="mint-cell-text">{{label}}</span></div>
      <div class="mint-cell-value"></div>
    </div>
  </a>
</template>

<style lang="scss" src="./CityPicker.scss"></style>

<script>
  import WeUI from 'weui.js/src/picker/picker'
  import cityData from './city-data'

  export default {
    props: {
      label: String
    },
    mounted(){
    },
    methods: {
      openPicker(){
        WeUI.picker(cityData, {
          depth: 3,
          onChange: this.onChange,
          onConfirm: this.onConfirm
        })
      },
      onChange(value){
        console.log(value)
      },
      onConfirm(){
        console.log('confirm')
      }
    }
  }
</script>
