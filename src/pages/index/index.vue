<template>
  <div>
    <div class="home" v-if="isAuth">
      <SearchBar 
        :disabled="true"
        @onClick="onSearchBarClick"
        :hotSearch="hotSearch"
      />
      <HomeCard :data="homeCard"/>
      <HomeBanner 
        img="http://www.youbaobao.xyz/book/res/bg.jpg"
        title="mpvue2.0实战多端小程序"
        subTitle="立即体验"
        @onClick="onBannerClick"
      />
      <div :style="{marginTop: '23px'}">
        <HomeBook 
          title="为你推荐"
          :row="1"
          :col="3"
          :data="recommend"
          mode="col"
          btn-text="换一批"
          @onBookMoreClick="recommendChange('recommend')"
          @onBookClick="onBookClick"
        />
      </div>
      <div :style="{marginTop: '23px'}">
        <HomeBook 
          title="免费阅读"
          :row="2"
          :col="2"
          :data="freeRead"
          mode="row"
          btn-text="换一批"
          @onBookMoreClick="recommendChange('freeRead')"
          @onBookClick="onBookClick"
        />
      </div>
      <div :style="{marginTop: '23px'}">
        <HomeBook 
          title="当前最热"
          :row="1"
          :col="4"
          :data="hotBook"
          mode="col"
          btn-text="换一批"
          @onBookMoreClick="recommendChange('hotBook')"
          @onBookClick="onBookClick"
        />
      </div>
      <div :style="{marginTop: '23px'}">
        <HomeBook 
          title="分类"
          :row="2"
          :col="2"
          :data="category"
          mode="category"
          btn-text="产看全部"
          @onBookMoreClick="onCategoryMoreClick"
          @onBookClick="onBookClick"
        />
      </div>
    </div>
    <Auth v-if="!isAuth" @getUserInfo="init"/>
  </div>
</template>

<script>
/* eslint-disable */
import SearchBar from '@/components/home/SearchBar'
import HomeCard from '@/components/home/HomeCard'
import HomeBanner from '@/components/home/HomeBanner'
import HomeBook from '@/components/home/HomeBook'
import Auth from '@/components/base/Auth'
import { getHomeData, recommend, freeRead, hotBook, register } from '@/api'
import {
  getSetting, 
  getUserInfo, 
  setStorageSync, 
  getStorageSync, 
  getUserOpenId,
  showLoading,
  hideLoading
} from '@/api/wechat'

export default {
  components: {
    SearchBar,
    HomeCard,
    HomeBanner,
    HomeBook,
    Auth
  },
  data () {
    return {
        hotSearch: '',
        homeCard: {},
        banner: {},
        recommend: [],
        freeRead: [],
        hotBook: [],
        category: [],
        shelf: '',
        isAuth: true
    }
  },
  methods: {
    init () {
      this.getSetting()
    },
    getUserInfo (e) {
      // 获得openId后去获取首页数据
      const onOpenIdComplete = (openId, userInfo) => {
        this.getHomeData(openId, userInfo)
        register(openId, userInfo)
      }
      getUserInfo(
        userInfo => {
          console.log(userInfo)
          // 把用户信息存进storage
          setStorageSync('userInfo', userInfo)
          // 每个用户在每个小程序都会获得唯一的openId
          const openId = getStorageSync('openId')
          if (!openId || openId.length === 0) {
            getUserOpenId(openId => onOpenIdComplete(openId, userInfo))
          } else {
            onOpenIdComplete(openId, userInfo)
          }
        },
        () => {
          console.log('failed')
        }
      )
    },
    getSetting () {
      getSetting('userInfo', 
      () => {
        this.isAuth = true
        showLoading('正在加载')
        this.getUserInfo()
      },
      () => {
        this.isAuth = false
      })
    },
    onSearchBarClick () {
      // 跳转到搜索页面
    },
    onBannerClick () {
      console.log('banner click ...')
    },
    onBookMoreClick () {
      console.log('more click')
    },
    onBookClick () {
      console.log('book click')
    },
    recommendChange (key) {
      switch (key) {
        case 'recommend':
          recommend().then(response => {
            this.recommend = response.data.data
          })
          break
        case 'freeRead':
          freeRead().then(response => {
            this.freeRead = response.data.data
          })
          break
        case 'hotBook':
          hotBook().then(response => {
            this.hotBook = response.data.data
          })
          break
      
        default:
          break
      }
    },
    onCategoryMoreClick () {},
    getHomeData (openId, userInfo) {
      getHomeData({openId: openId}).then(response => {
        const {
          data: {
            hotSearch: {
              keyword
            },
            shelf,
            banner,
            recommend,
            freeRead,
            hotBook,
            category,
            shelfCount
          }
        } = response.data
        this.hotSearch = keyword
        this.banner = banner
        this.recommend = recommend
        this.freeRead = freeRead
        this.hotBook = hotBook
        this.category = category
        this.homeCard = {
          bookList: shelf,
          num: shelfCount,
          userInfo
        }
        hideLoading()
      }).catch(err => {
        hideLoading()
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>

</style>
