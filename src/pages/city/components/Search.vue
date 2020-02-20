<template>
  <div>
    <div class="search">
      <input class="search-input" type="text" placeholder="输入城市名或拼音" v-model="keyword" />
    </div>
    <div class="search-content" v-show="keyword" ref="list">
      <ul class="search-list">
        <li class="search-item border-bottom" v-for="item of list" :key="item.id" @click="handleCityChange(item.name)">
          {{item.name}}
        </li>
        <li class="search-item border-bottom" v-show="hasNoList">暂无数据</li>
      </ul>
    </div>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
import {mapMutations} from 'vuex'
export default {
  name: 'CitySearch',
  props: {
    cities: Object
  },
  data () {
    return {
      keyword: '',
      list: [],
      timer: null
    }
  },
  watch: {
    keyword () {
      this.getSearchResult()
    }
  },
  computed: {
    hasNoList () {
      return !this.list.length
    }
  },
  methods: {
    getSearchResult: function () {
      const result = []
      if (!this.keyword) {
        this.list = []
        return
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        for (let i in this.cities) {
          this.cities[i].forEach(value => {
            if (value.name.indexOf(this.keyword) > -1 || value.spell.indexOf(this.keyword) > -1) {
              result.push(value)
            }
          })
        }
        this.list = result
      }, 100)
    },
    handleCityChange: function (city) {
      this.cityChange(city)
      this.$router.push('/')
    },
    ...mapMutations(['cityChange'])
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.list, { mouseWheel: true, click: true, tap: true })
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'

.search
  height: 0.72rem
  padding: 0 0.1rem
  background: $bgColor

  .search-input
    box-sizing: border-box
    width: 100%
    height: 0.62rem
    padding: 0 0.1rem
    line-height: 0.62rem
    text-align: center
    border-radius: 0.06rem
    color: #666

.search-content
  position: absolute
  top: 1.58rem
  bottom: 0
  left: 0
  right: 0
  background: #eee
  z-index: 1
  overflow: hidden

  .search-item
    line-height: 0.62rem
    padding-left: 0.2rem
    background: #fff
    color: #666
</style>
