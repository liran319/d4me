export default {
  data(){
    return {
      showTitle: false
    }
  },
  methods:{
    goBack(){
      this.$router.back()
    }
  }
}
