<template>
  <div>
    <DetailBook :book="book"/>
    <DetailStat
      :readers="book.readers"
      :readerNum="book.readerNum"
      :rankNum="book.rankNum"
      :rankAvg="book.rankAvg"
    />
    <DetailRate 
      :rateValue="book.rateValue"
      @onRateChange="onRateChange"
    />
  </div>
</template>

<script>
import DetailBook from '@/components/detail/DetailBook'
import DetailStat from '@/components/detail/DetailStat'
import DetailRate from '@/components/detail/DetailRate'
import { bookDetail, bookRankSave } from '@/api'
import { getStorageSync } from '@/api/wechat'
export default {
  components: {
    DetailBook,
    DetailStat,
    DetailRate
  },
  data () {
    return {
      book: {}
    }
  },
  methods: {
    onRateChange (value) {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      bookRankSave({
        openId,
        fileName,
        rank: value
      }).then(res => {
        this.getBookDetail()
      })
    },
    getBookDetail () {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      if (openId && fileName) {
        bookDetail({bookDetail, fileName}).then(res => {
          this.book = res.data.data
        })
      }
    }
  },
  mounted () {
    this.getBookDetail()
  }
}
</script>

<style lang="scss" scoped>

</style>