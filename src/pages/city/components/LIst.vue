<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{this.city}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div class="button-wrapper" v-for="item of hot" :key="item.id">
            <div class="button" @click="handleCityChange(item.name)">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="area" v-for="(city,index) of cities" :key="index" :ref="index">
        <div class="title border-topbottom">{{index}}</div>
        <div class="item-list">
          <div class="item border-bottom" v-for="item of city" :key="item.id" @click="handleCityChange(item.name)">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {mapState, mapMutations} from 'vuex'
// import Bus from '@/assets/Bus.js'
export default {
  name: 'CityList',
  props: {
    hot: Array,
    cities: Object,
    letter: String
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, { mouseWheel: true, click: true, tap: true })
    // Bus.$on('getLetterr', (e) => {
    //   this.scrollList(e)
    // })
  },
  watch: {
    letter (e) {
      this.scrollList(e)
    }
  },
  computed: {
    ...mapState(['city'])
  },
  methods: {
    scrollList: function (letter) {
      let element = this.$refs[letter][0]
      this.scroll.scrollToElement(element)
    },
    handleCityChange: function (city) {
      this.cityChange(city)
      this.$router.push('/')
    },
    ...mapMutations(['cityChange'])
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'

.border-topbottom
  &:before
    border-color: #ccc

  &:after
    border-color: #ccc

.border-bottom
  &:before
    border-color: #ccc

.list
  overflow: hidden
  position: absolute
  top: 1.58rem
  left: 0
  right: 0
  bottom: 0

  .title
    line-height: 0.54rem
    background: #eee
    padding-left: 0.2rem
    color: #666
    font-size: 0.26rem

  .button-list
    overflow: hidden
    padding: 0.1rem 0.6rem 0.1rem 0.1rem

    .button-wrapper
      float: left
      width: 33.33%

      .button
        margin: 0.1rem
        padding: 0.1rem 0
        text-align: center
        border: 0.02rem solid #ccc
        border-radius: 0.06rem

  .item-list
    .item
      line-height: 0.76rem
      padding-left: 0.2rem
</style>
