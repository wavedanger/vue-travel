<template>
  <div>
    <div class="banner" @click="handleBannerClick">
      <img class="banner-img" :src="bannerImg" />
      <div class="banner-info">
        <div class="banner-title">
          {{sightName}}
        </div>
        <div class="banner-number">
          <span class="iconfont banner-icon">&#xe77b;</span>
          {{gallaryImgs.length}}
        </div>
      </div>
    </div>
    <fade-animation>
      <common-gallary :imgs="gallaryImgs" @close="handleGallaryClick" v-show="showGallary"></common-gallary>
    </fade-animation>
  </div>
</template>
<script>
import CommonGallary from '@/common/gallary/Gallary'
import FadeAnimation from '@/common/fade/FadeAnimation'
export default {
  name: 'DetailBanner',
  data () {
    return {
      showGallary: false
      // imgs: ['http://img1.qunarzz.com/sight/p0/1409/19/adca619faaab0898245dc4ec482b5722.jpg_350x240_8e61302a.jpg',
      //   'http://img1.qunarzz.com/sight/p0/1909/4e/4e1afc2e1133ade7a3.img.jpg_350x240_2646c984.jpg']
    }
  },
  props: {
    sightName: String,
    bannerImg: String,
    gallaryImgs: Array
  },
  components: {
    CommonGallary,
    FadeAnimation
  },
  methods: {
    handleBannerClick () {
      this.showGallary = true
    },
    handleGallaryClick: function () {
      this.showGallary = false
    }
  }
}
</script>
<style lang="stylus" scoped>
.banner
  height: 0
  padding-bottom: 55%
  overflow: hidden
  position: relative

  .banner-img
    width: 100%

  .banner-info
    display: flex
    position: absolute
    left: 0
    right: 0
    bottom: 0
    line-height: 0.6rem
    color: #fff
    background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))

    .banner-title
      flex: 1
      font-size: 0.32rem
      padding: 0 0.2rem

    .banner-number
      height: 0.32rem
      line-height: 0.32rem
      margin-top: 0.14rem
      margin-right: 0.2rem
      padding: 0 0.4rem
      border-radius: 0.2rem
      background: rgba(0, 0, 0, 0.8)
      font-size: 0.24rem

      .banner-icon
        font-size: 0.24rem
</style>
