<template>
  <a class="city-picker mint-cell mint-field"  @click="openPicker">
    <div class="mint-cell-wrapper">
      <div class="mint-cell-title"><span class="mint-cell-text">{{label}}</span></div>
      <div class="mint-cell-value">{{displayValue}}</div>
    </div>
  </a>
</template>

<style lang="scss" src="./CityPicker.scss"></style>

<script>
  import './picker'
  import cityData from './city-data'
  export default {
    props: {
      label: String,
      value: String
    },
    data(){
      return {
        displayValue:this.value
      }
    },
    methods: {
      openPicker(){
        weui.picker(cityData, {
          depth: 3,
          onChange: this.onChange,
          onConfirm: this.onConfirm
        })
      },
      getDisplayValue(value){
        return _.map(value, function(item){
          return item.label
        }).join(" ")
      },
      onChange(value){
        this.displayValue = this.getDisplayValue(value)
      },
      onConfirm(){
        this.$emit('input', this.displayValue)
      }
    }
  }
</script>
