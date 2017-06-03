export default {
  data(){
    return {
      showTitle: false
    }
  },
  methods:{
    goBack(){
      this.$router.back()
    },
    inHandler(){
      this.showTitle = false
    },
    outHandler(){
      this.showTitle = true
    }
  }
}
