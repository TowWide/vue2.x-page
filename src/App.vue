<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
    <div class="tab">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评价</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header';

const ERR_OK = 0;

export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$http.get('/api/seller').then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data;
      };
    }, response => { });
  },
  components: { 'v-header': header }
};
</script>
<style lang="scss" rel="stylesheet/scss">
@import "./common/styles/fonticon";
@import "./common/styles/base";
#app .tab {
  position: relative;
  z-index: 7;
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  .tab-item {
    flex: 1;
    display: block;
    text-align: center;
    font-size: 14px;
    color: rgb(77, 85, 93)
  }
  .router-link-exact-active {
    color: rgb(240, 20, 20)
  }
}
</style>
