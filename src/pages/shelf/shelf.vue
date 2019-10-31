<template>
  <div>
    <ShelfUserInfo 
      :userInfo="userInfo"
      :readDay="readDay"
      :num="shelfList.length"
    />
    <ShelfList :shelfList="shelfList"/>
  </div>
</template>

<script>
import ShelfUserInfo from '@/components/shelf/ShelfUserInfo'
import ShelfList from '@/components/shelf/ShelfList'
import { getStorageSync } from '@/api/wechat'
import { userDay, bookIsInShelf } from '@/api'
export default {
  components: {
    ShelfUserInfo,
    ShelfList
  },
  data () {
    return {
      userInfo: {},
      readDay: 0,
      shelfList: []
    }
  },
  onShow () {
    this.userInfo = getStorageSync('userInfo')
    const openId = getStorageSync('openId')
    userDay({ openId }).then(res => {
      this.readDay = res.data.data.day
    })
    bookIsInShelf({ openId }).then(res => {
      this.shelfList = res.data.data
      this.shelfList.push({})
    })
  }
}
</script>

<style>

</style>