<template>
  <div class="checkbox-item">
    <label class="mint-checklist-label checkbox-item">
      <span class="mint-checkbox">
        <input type="checkbox" class="mint-checkbox-input" checked="selected" :value="value"/>
        <span class="mint-checkbox-core"></span>
      </span>
      <span class="mint-checkbox-label" v-if="label">{{label}}</span>
    </label>
  </div>
</template>

<style lang="scss" src="./CheckBox.scss"></style>

<script>
  export default {
    props:{
      label:String,
      selected:Boolean,
      value:String
    }
  }
</script>
