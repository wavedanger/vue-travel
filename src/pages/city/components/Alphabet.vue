<template>
  <ul class="list" ref="list">
    <li class="list-item" v-for="item of letters" :key="item" :ref="item" @click="handleLetter" @touchstart.prevent="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">{{item}}</li>
  </ul>
</template>
<script>
// import Bus from '@/assets/Bus.js'
export default {
  name: 'CityAlphabet',
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  updated () {
    this.startY = this.$refs['A'][0].offsetTop + this.$refs.list.offsetTop
  },
  props: {
    cities: Object
  },
  computed: {
    letters () {
      let letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters
    }
  },
  methods: {
    handleLetter: function (e) {
      this.$emit('getLetter', e.target.innerText)
      // Bus.$emit('getLetterr', e.target.innerText)
    },
    handleTouchStart: function () {
      this.touchStatus = true
    },
    handleTouchMove: function (e) {
      if (this.touchStatus) {
        if (!this.timer) {
          this.timer = setTimeout(() => {
            let y = e.touches[0].clientY
            let index = Math.floor((y - this.startY) / 20)
            if (index >= 0 && index < this.letters.length) {
              this.$emit('getLetter', this.letters[index])
            }
            this.timer = null
          }, 16)
        }
      }
    },
    handleTouchEnd: function () {
      this.touchStatus = false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl'

.list
  position: absolute
  top: 1.58rem
  right: 0
  bottom: 0
  display: flex
  flex-direction: column
  justify-content: center
  width: 0.6rem
  color: $bgColor

  .list-item
    width: 100%
    text-align: center
    line-height: 0.4rem
</style>
