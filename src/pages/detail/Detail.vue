<template>
  <div>
    <detail-header></detail-header>
    <detail-banner :sightName="sightName" :bannerImg="bannerImg" :gallaryImgs="gallaryImgs"></detail-banner>
    <div class="content">
      <detail-list :list="list"></detail-list>
    </div>
  </div>
</template>
<script>
import DetailBanner from './components/banner'
import DetailHeader from './components/header'
import DetailList from './components/List'
export default {
  name: 'Detail',
  data () {
    return {
      sightName: '',
      bannerImg: '',
      gallaryImgs: [],
      list: []
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail: function () {
      this.axios.get('/api/detail.json', {
        params: {
          id: this.$route.params.id
        }
      }).then(res => this.getDetailSucc(res.data))
    },
    getDetailSucc: function (res) {
      if (res.ret && res.data) {
        this.sightName = res.data.sightName
        this.bannerImg = res.data.bannerImg
        this.gallaryImgs = res.data.gallaryImgs
        this.list = res.data.categoryList
      }
    }
  },
  components: {
    DetailBanner,
    DetailHeader,
    DetailList
  }
}
</script>
<style lang="stylus" scoped>
.content
  height: 50rem
</style>
