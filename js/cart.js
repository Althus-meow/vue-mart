// eslint-disable-next-line 
let vm = new Vue({
  el: "#app",
  data: {
    productList: [],
    totalMoney: 0
  },
  filters: {

  },
  mounted: function(){
    console.log('mounted!');
    this.$nextTick(function(){
      this.cartView();
    });
  },
  methods: {
    cartView: function(){
      console.log('cartView!');
      let _this = this;
      this.$http.get("data/cartData.json", {"id" : 123}).then(res => {
        let result = res.data.result;
        _this.productList = result.list;
        _this.totalMoney = result.totalMoney;
      });
    }
  }
});