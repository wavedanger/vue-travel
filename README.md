# vue- tourism

#### 介绍

~~乘疫情，努力学习！！！~~

---
[去哪儿网](https://touch.piao.qunar.com/)

[imooc课程：Vue2.5 开发去哪儿网App](https://coding.imooc.com/learn/list/423.html)
#### 技术栈
* [vue](https://cn.vuejs.org/)
* [vuex](https://vuex.vuejs.org/zh/)
* [vue-router](https://router.vuejs.org/zh/)
* [vue-cli](https://cli.vuejs.org/zh/)
* [vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper/tree/v2.6.7)
* [axios](https://github.com/axios/axios)
* [better-scroll](https://github.com/ustbhuangyi/better-scroll)
* [fastclick](https://github.com/ftlabs/fastclick)
* [stylus](https://github.com/stylus/stylus)
#### 安装教程

1. 环境
* node.js(npm)官网下载
* cnpm更快
```
npm install -g cnpm --registry=http://registry.npm.taobao.org
```
* webpack
```
npm install webpack -g
```
* vue-cli
```
npm install vue-cli -g
```
2. 运行
* clone或下载项目到本地
* cd到项目文件夹
* npm install安装依赖
* 执行npm run dev
3. 打包
* clone或下载项目到本地
* cd到项目文件夹
* npm install安装依赖
* 执行npm run build
* 将生成的dist文件夹里的文件复制到服务器上即可

#### 开发记录

1.  首页
  * header
    * 使用flex+float布局，实现左右固宽，中间自适应
  * swiper
    * 第三方插件vue-awesome-swiper
    * 利用padding-bottom实现图片加载前的占位
    * 利用>>>或/deep/可实现样式穿透（scoped原因）改变swiper样式
  * icons
    * 利用padding-bottom实现区域占位，包括总的icons占位和单个icon占位
    * 布局有两种方式，可利用flex或者position，详情见[代码]()
    * flex布局注意：每个div块需设置宽度
    * position布局注意：单个icon设置relative，图标和文本分别设置absolute，再利用topleftrightbottom定位
    * 图标每超过8个，保存为一个一维数组，最后生成以页数为索引的二维数组，通过两层for循环在第三方插件vue-awesome-swiper输出
  * 文本过长显示省略号可合并为mixins方法，方便调用，注意使用的文本需要有width
  * proxyTable代理模拟接口
    ```js
    proxyTable: {
      '/api': {
        target: 'http://localhost:8081',
        pathRewrite: {
          '^/api': '/static/mock'
        }
      }
    }
    ```
    * axios全局声明
    ```js
    Vue.prototype.axios = axios
    //可用this.axios.get调用
    ```
    * 再次注意this指向
2.  城市页
  * border.css
    * 移动端1像素处理实至是利用伪元素和transform的scale
    * 有时颜色不过深时，可以通过伪元素的border-color覆盖
  * 滚动列表利用better-scroll
    * 注意滚动的区域需为一个块
  * 数据请求在created还是在mounted
    * 理论上created是比mounted更快拿到数据
    * 两个生命周期主要区别是dom是否挂载到实例
    * 所以请求可以根据是否需要渲染dom再触发请求来决定
    * 这是个争议性问题，继续探讨
  * 利用索引实现列表自动跳转
    * 数据传递
      * 索引表->索引->列表
      * 方式：
        * 子->父->子
        * 兄弟->bus->兄弟
    * 点击索引
      * 监听点击事件 
      * 通过e.target.innerText拿到点击的索引，再进行数据传递
    * 滑动索引
      * 监听滑动事件(touchstart,touchmove,touchend)，保证在touchmove时执行逻辑计算
      * 通过ref拿到索引列表距顶部的高度h1
      * 通过e.touches[0].clientY拿到滑动后距顶部的高度h2
      * 若此时每个索引所占高度为h3
      * 则索引值index可为：Math.floor((h2-h1)/h3)
      * 再进行数据传递：letters[index]
    * better-scroll提供跳转方法
      * 接收索引
      * 用watch监听索引改变
      * 通过ref拿到对应索引的dom
      * 再通过scrollToElement跳转
    * 搜索城市
      * v-model保存input搜索值，并通过watch更新搜索结果
      * 通过循环遍历各索引城市名并indexOf搜索值，大于-1的存入搜索结果数组
      * 把结果遍历出来，注意考虑结果为空的情况
    * vuex
      * state当前城市名,可用commit mutation直接修改
      * 可以在computed引入mapState简化this.$store.state
      * 可以在methods引入mapMutations简化this.$store.mutations
    * 编程式导航
      * $router.push("/")直接返回首页
    * 页面刷新保持城市位置
      * 每次更改state.city时，保存到对应的localStorage.city
      * 注意用trycatch考虑用户关闭localStorage的情况（隐身浏览）
    * keep-alive实现缓存页面，减少请求
      * 注意此时mounted不调用，改为activated
      * 通过定义一个变量保存上次城市，再比较更改的城市是否相同来决定是否在activated上请求
3.  详情页
  * router-link跳转
    * 携带id,通过tag="li"代替li标签
      ````js
      <router-link :to="'/Detail/'+id" tag="li"></router-link>
      ````
  * banner部分
    * 图片展示采用swiper依赖
    * 通过v-show来控制显隐图片轮播
  * header部分
    * 这里分为两个头部，一个进入显示，一个向下滑动一定距离显示并隐藏另一个
    * 第二个通过 window.addEventListener('scroll', this.handleScroll)监听向下滑动距离
    * 通过逻辑处理滚动距离从小到大对应透明度opactiy从0到1，并将该样式对应到头部上
    * 这里得注意组件间的层级z-index，防止相互覆盖
    * 离开组件时务必清空监听的scroll事件，window.removeEventListener('scroll', this.handleScroll)
    * 由于使用了keep-alive，所以要在activated和deactivated调用和卸载scroll
  * list部分
    * 递归组件
      * 就是组件里嵌套组件，要求数据有一定重复性
    * axios进行ajax请求
      * this.$route.params可以拿到对应传递id
    * 进入详情页数据重载
      * 除了将请求方法放在activated上，也可用keep-alive的exclude="Detail"
      * 但用了keep-alive的exclude="Detail"，就得改用mounted
    * 进入详情页默认滑动到顶部
      * 在router.js调用better-scroll api
      ```js
      scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
      }
      ```
    * 照片栏动画
      * 利用vue的transition标签加上其对应的过渡类名可以实现
    * 组件名称使用总结
      * 用于调用组件，包括递归组件
      * 用于vue Devtools展示
      * 用于keep-alive属性exclude="组件名"，表示不缓存
4. 真机测试
  * 修改package.json，增加--host 0.0.0.0，手机便可通过局域网ip访问(ipconfig命令可查看)
    ```js
    "dev": "webpack-dev-server --host 0.0.0.0 --inline --progress --config build/webpack.dev.conf.js"
    ```
  * bug
    * 拖动城市索引字母列表时，页面跟着拖动
      * 解决：为touchStart添加prevent修饰符
    * 白屏
      * 解决1：不支持promise,所以添加依赖babel-polyfill
      * 解决2：webpack-dev-server本身原因
    * 城市无法选择
      * better-scroll默认阻止点击
      ```js
      this.scroll = new BScroll(this.$refs.wrapper, { mouseWheel: true, click: true, tap: true })
      ```
5. 打包上线
  * npm run build生成dist文件夹（index.html,static文件夹）
  * 根路径：将里面生成文件放到后端服务器上即可，即访问服务器地址+index.html
  * 自定义路径（这里以project文件夹为例）：
    * 需重新打包，在项目上，->config->index.js里的build项
    ```js
      assetsPublicPath: '/', 
      assetsPublicPath: '/project',
    ```
    * 保存后重新运行npm run build
    * 生成的dist名称改为project
    * 再放到服务器根目录即可
6. 异步组件按需加载
  * 当项目比较庞大，app.js达到了几mb，才要异步加载，不然会多出很多http请求
  * 可以在路由处设置，也可以在组件引用处设置
    ```js
    router/index.js
    routes: [
      {
        path: '/city',
        name: 'City',
        component: City
      }]
    routes: [
      {
        path: '/city',
        name: 'City',
        component: ()=>import("@/pages/city/City")
      }]
    ```
    ```js
    components/Home.vue
    components:{
      HomeHeader:()=>import("./components/Header")
    }
    ```
7. 谨慎使用git reset --hard
  * 由于我在使用以上命令时，对就是你看到的这个readme，是没有push、commit、add，仅仅只是ctrl+s
  * 然后我执行的git reset hard
  * 再打开vscode时想写readme时，一片茫然！
  * 之前那么多个分支我都没有提交，想到最后才提交，没想到啊
  * 抱着尝试的忐忑心理我打开了google：commit的可以恢复，add可以恢复。。。完了！
  * 是的，没想到啊，我一个ctrl+z就让我活了过来
  * 是这样的，vscode的readme选项卡我没有关掉
  * 众所周知，编辑器都有缓存，即使全部清空，也可以撤消！
  * 最后，还是要谨慎使用这条命令，幸好这次幸运，要不然你们就见不到这个readme了！