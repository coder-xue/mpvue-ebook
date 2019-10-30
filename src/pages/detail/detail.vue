<template>
  <div>
    <DetailBook :book="book"/>
  </div>
</template>

<script>
import DetailBook from '@/components/detail/DetailBook'
import { bookDetail } from '@/api'
import { getStorageSync } from '@/api/wechat'
export default {
  components: {
    DetailBook
  },
  data () {
    return {
      book: {}
    }
  },
  mounted () {
    const openId = getStorageSync('openId')
    const { fileName } = this.$route.query
    if (openId && fileName) {
      bookDetail({bookDetail, fileName}).then(res => {
        this.book = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>