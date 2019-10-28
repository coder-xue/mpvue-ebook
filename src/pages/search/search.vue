<template>
  <div>
    <SearchBar 
      :hotSearch="hotSearchKeyword"
      :focus="searchFocus"
      @onChange="onChange"
      @onClear="onClear"
      @onConfirm="onConfirm"
      ref="searchBar"
    />
    <TagGroup
      header-text="热门搜索"
      btn-text="换一批"
      :value="hotSearchArray"
      @onBtnClick="changeHotSearch"
      @onTagClick="showBookDetail"
      v-if="hotSearch.length > 0 && !showList"
    />
    <TagGroup
      header-text="历史搜索"
      btn-text="清空"
      :value="historySearch"
      @onBtnClick="clearHistorySearch"
      @onTagClick="searchkeyWord"
      v-if="historySearch.length > 0 && !showList"
    />
    <SearchList 
      :data="searchList"
      v-if="showList"
    />
  </div>
</template>

<script>
/* eslint-disable */
import SearchBar from '@/components/home/SearchBar'
import Tag from '@/components/base/Tag'
import TagGroup from '@/components/base/TagGroup'
import SearchItem from '@/components/search/SearchItem'
import SearchTable from '@/components/search/SearchTable'
import SearchList from '@/components/search/SearchList'
import { search, hotSearch } from '@/api'
import { getStorageSync, setStorageSync, showToast } from '@/api/wechat'
export default {
  components: {
    SearchBar,
    Tag,
    TagGroup,
    SearchItem,
    SearchTable,
    SearchList
  },
  computed: {
    showList () {
      const keys = Object.keys(this.searchList)
      return keys.length > 0
    },
    hotSearchArray () {
      const _hotSearch = []
      this.hotSearch.forEach(o => _hotSearch.push(o.title))
      return _hotSearch
    }
  },
  data () {
    return {
      searchList: {},
      hotSearchKeyword: '',
      hotSearch: [],
      historySearch: [],
      searchFocus: true,
      openId: '',
      page: 1
    }
  },
  methods: {
    onConfirm (keyword) {
      // 1.判断是否有搜索关键词，如果没有，则获取热门搜索词，通过热门搜索词发起请求，如果有，就用搜索关键词发起请求
      if (!keyword || keyword.trim().length === 0) {
        keyword = this.hotSearchKeyword
        this.$refs.searchBar.setValue(keyword)
      } else {

      }
      this.onSearch(keyword)
      // 2.将搜索结果写入历史搜索
      if(!this.historySearch.includes(keyword)) {
        this.historySearch.push(keyword)
        setStorageSync('historySearch', this.historySearch)
      }
      // 3.将搜索框失去焦点
      this.searchFocus = false
    },
    onClear () {
      this.searchList = {}
    },
    onChange (keyword) {
      if (!keyword || keyword.trim().length === 0) {
        this.searchList = {}
        return
      }
      this.page = 1
      this.onSearch(keyword)
    },
    onSearch (keyword) {
      search({
        keyword,
        openId: this.openId,
        page: this.page
      }).then(res => {
        this.searchList = res.data.data
      })
    },
    clearHistorySearch () {
      this.historySearch = []
      setStorageSync('historySearch', [])
    },
    searchkeyWord (text) {
      this.$refs.searchBar.setValue(text)
      this.onSearch(text)
    },
    onTagClick () {
      console.log('tag')
    },
    showBookDetail (text, index) {
      console.log(text, index)
    },
    changeHotSearch () {
      hotSearch().then(res => {
        this.hotSearch = res.data.data
      })
    }
  },
  mounted () {
    this.page = 1
    this.openId = getStorageSync('openId')
    hotSearch().then(res => {
      this.hotSearch = res.data.data
    })
    this.hotSearchKeyword = this.$route.query.hotSearch
    this.historySearch = getStorageSync('historySearch') || []
  },
  // 生命周期函数, 滚动条滑动的时候调用
  onPageScroll () {
    if (this.searchFocus) {
      this.searchFocus = false
    }
  },
  // 生命周期函数, 滚动条到达底部的时候调用
  onReachBottom () {
    if (this.showList) {
      this.page++
      const searchWord = this.$refs.searchBar.getValue()
      search({
        keyword: searchWord,
        openId: this.openId,
        page: this.page
      }).then(res => {
        const { book } = res.data.data
        if (book && book.length > 0) {
          this.searchList.book.push(...book)
        } else {
          showToast('没有更多数据了')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>