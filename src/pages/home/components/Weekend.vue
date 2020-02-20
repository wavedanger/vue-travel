<template>
  <div>
    <div class="title">周末去哪儿</div>
    <ul>
      <li class="item border-bottom" v-for="item of weekendList" :key="item.id">
        <div class="item-img-wrapper">
          <img class="item-img" :src="item.imgUrl" alt="">
        </div>
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'HomeWeekend',
  data () {
    return {
    }
  },
  props: {
    weekendList: Array
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/mixins.styl'

.title
  background: #eee
  line-height: 0.8rem
  text-indent: 0.2rem

.item-img-wrapper
  background: #ccc
  height: 0
  padding-bottom: 37.9%
  overflow: hidden

  .item-img
    width: 100%

.item-info
  flex: 1
  padding: 0.1rem
  min-width: 0

  .item-title
    line-height: 0.5rem
    font-size: 0.32rem
    ellipsis()

  .item-desc
    line-height: 0.5rem
    color: #ccc
    ellipsis()
</style>
