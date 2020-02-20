<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont back-icon">&#xe624;</div>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe632;</span>请输入</div>
    <router-link to="/city">
      <div class="header-right">
        {{this.city}}
        <span class="iconfont arrow-icon">&#xe62d;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'HomeHeader',
  // props: {
  //   city: String
  // },
  computed: {
    ...mapState(['city'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'

.header
  display: flex
  line-height: $headerHeight
  background: $bgColor
  color: #fff

  .header-left
    width: 0.64rem
    float: left

    .back-icon
      text-align: center

  .header-input
    flex: 1
    margin-top: 0.12rem
    margin-left: 0.2rem
    padding-left: 0.2rem
    line-height: 0.62rem
    height: 0.62rem
    background: #fff
    border-radius: 0.1rem
    color: #ccc

  .header-right
    min-width: 1.24rem
    padding: 0 0.1rem
    float: right
    text-align: center
    color: #fff

    .arrow-icon
      font-size: 0.24rem
</style>
