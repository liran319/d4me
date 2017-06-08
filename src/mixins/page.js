export default {
  data(){
    return {
      page:1
    }
  },
  computed: {
    pending(){
      return this.$store.state[this.storeName].pending
    },
    hasMore(){
      return this.pending||this.$store.state[this.storeName].hasMore
    }
  },
  mounted(){
    this.fetchData()
  },
  methods:{
    fetchData(){
      this.page = 1
      this.$store.dispatch(`${this.storeName}/fetch`,{
        options:{
          params:Object.assign({
            page:this.page
          }, this.condition)
        }
      })
    },
    fetchMore(){
      this.page++
      this.$store.dispatch(`${this.storeName}/fetchMore`,{
        options:{
          params:Object.assign({
            page:this.page
          }, this.condition)
        }
      })
    }
  }
}
