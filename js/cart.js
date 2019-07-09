// eslint-disable-next-line 
let vm = new Vue({
  el: "#app",
  data: {
    productList: [],
    totalMoney: 0,
    allChecked: false,
    showDelConfirm: false,
    delIdx: -1
  },
  filters: {
    formatMoney: function(value){
      return "¥ "+value.toFixed(2);
    }
  },
  mounted: function(){
    console.log('mounted!');
    this.$nextTick(function(){
      vm.cartView();
    });
  },
  methods: {
    cartView: function(){
      this.$http.get("data/cartData.json", {"id" : 123}).then(res => {
        let result = res.data.result;
        this.productList = result.list;
        // this.totalMoney = result.totalMoney;
      });
    },

    changeQuantity: function(product, delta){
      if (product){
        product.productQuantity += parseInt(delta);
        product.productQuantity = product.productQuantity < 1 ? 1 : product.productQuantity;
      }
      this.calcTotalMoney();
    },

    checkProduct: function(product){
      if (typeof product.checked == 'undefined'){
        // eslint-disable-next-line 
        // Vue.set(product, 'checked', true);
        this.$set(product, 'checked', true);
      }else{
        product.checked = !product.checked;
      }
      this.calcTotalMoney();
    },

    checkAll: function(flag){
      if (flag || flag === false){
        this.allChecked = flag;
      }else {
        this.allChecked = !this.allChecked;
      }
      this.productList.forEach(element => {
        if (typeof element.checked == 'undefined'){
          this.$set(element, 'checked', this.allChecked);
        }else{
          element.checked = this.allChecked;
        }
      });
      this.calcTotalMoney();
    },

    calcTotalMoney: function(){
      this.totalMoney = this.productList.reduce((priceSum, product) => {
        return priceSum + (product.checked ? (product.productPrice * product.productQuantity) : 0);
      }, 0);
    },

    delClick: function(delIndex){
      this.showDelConfirm = true;
      this.delIdx = delIndex;
    },

    delConfirm: function(){
      this.showDelConfirm = false;
      this.productList.splice(this.delIdx, 1);
      this.calcTotalMoney();
    }

  }
});
// eslint-disable-next-line 
Vue.filter('currency', (value, unit) => {
  return value.toFixed(2) + (unit? unit : '');
});