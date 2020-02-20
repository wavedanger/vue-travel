<template>
  <div>
    <div class="title">热销推荐</div>
    <ul>
      <router-link :to="'/Detail/'+item.id" tag="li" class="item border-bottom" v-for="item of recommendList" :key="item.id">
        <img class="item-img" :src="item.imgUrl" alt="">
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
          <button class="item-button">查看详情</button>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'HomeRecommend',
  data () {
    return {

    }
  },
  props: {
    recommendList: Array
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/mixins.styl'

.title
  background: #eee
  line-height: 0.8rem
  text-indent: 0.2rem

.item
  display: flex
  height: 1.9rem
  overflow: hidden

  .item-img
    width: 1.7rem
    height: 1.7rem
    padding: 0.1rem

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

    .item-button
      line-height: 0.5rem
      margin-top: 0.2rem
      background: #ff9300
      padding: 0rem 0.1rem
      border-radius: 0.06rem
</style>
