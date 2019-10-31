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
    <DetailContents 
      :contents="contents"
      @readBook="readBook"
    />
    <!-- <DetailBottom 
      :isInShelf="isInShelf"
      @handleShelf="handleShelf"
    /> -->
    <div class="detail-bottom">
      <div class="detail-btn-wrapper">
        <van-button
          :custom-class="isInShelf ? 'detail-btn-remove' : 'detail-btn-shelf'"
          round
          @click="handleShelf"
        >
          {{isInShelf ? '移出书架' : '加入书架'}}
        </van-button>
      </div>
      <div class="detail-btn-wrapper">
        <van-button
          custom-class="detail-btn-read"
          round
          @click="() => readBook()"
        >
          阅读
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import DetailBook from '@/components/detail/DetailBook'
import DetailStat from '@/components/detail/DetailStat'
import DetailRate from '@/components/detail/DetailRate'
import DetailContents from '@/components/detail/DetailContents'
import DetailBottom from '@/components/detail/DetailBottom'
import { bookDetail, bookRankSave, bookContents, bookIsInShelf, bookShelfSave, bookShelfRemove } from '@/api'
import { getStorageSync } from '@/api/wechat'
export default {
  components: {
    DetailBook,
    DetailStat,
    DetailRate,
    DetailContents,
    DetailBottom
  },
  data () {
    return {
      book: {},
      contents: [],
      isInShelf: false
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
    },
    getBookContents () {
      const { fileName } = this.$route.query
      if (fileName) {
        bookContents({fileName}).then(res => {
          this.contents = res.data.data
        })
      }
    },
    readBook (href) {
      const query = {
        fileName: this.book.fileName,
        opf: this.book.opf
      }
      if (href) {
        console.log(href)
        const index = href.indexOf('/')
        if (index >= 0) {
          query.navigation = href.slice(index + 1)
        } else {
          query.navigation = href
        }
      }
      if (this.book && this.book.fileName) {
        this.$router.push({
          path: '/pages/read/main',
          query
        })
      }
    },
    getBookIsInShelf () {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      if (openId && fileName) {
        bookIsInShelf({ openId, fileName }).then(res => {
          const { data } = res.data
          data.length === 0 ? this.isInShelf = false : this.isInShelf = true
        })
      }
    },
    // 加入-移出书架
    handleShelf () {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      if (!this.isInShelf) {
        bookShelfSave({ openId, fileName }).then(res => {
          this.getBookIsInShelf()
        })
      } else {
        const vue = this
        mpvue.showModal({
          title: '提示',
          content: `是否确认将《${this.book.title}》移出书架?`,
          success (res) {
            if (res.confirm) {
              bookShelfRemove({ openId, fileName }).then(res => {
                vue.getBookIsInShelf()
              })
            } else {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  },
  mounted () {
    this.getBookDetail()
    this.getBookContents()
    this.getBookIsInShelf()
  },
  onShow () {
    this.isInShelf = false
  }
}
</script>

<style lang="scss" scoped>
  .detail-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-top: 1px solid #eee;
    box-shadow: 0 -2px 4px 0 rgba(0,0,0,.1);

    .detail-btn-wrapper {
      flex: 1;

      .detail-btn-read {
        width: 100%;
        border: none;
        color: #fff;
        background: #1EA3F5;
        margin-left: 7.5px;
      }

      .detail-btn-shelf {
        width: 100%;
        color: #1EA3F5;
        background: #fff;
        border: 1px solid #1EA3F5;
        margin-right: 7.5px;
      }

      .detail-btn-remove {
        width: 100%;
        color: #F96128;
        background: rgba(255, 175, 155, .3);
        border: 1px solid #FFAF9B;
        margin-right: 7.5px;
      }
    }
  }
</style>
