<template>
  <div>
    <SearchBar 
      :focus="searchFocus"
      @onChange="onChange"
    />
    <TagGroup
      header-text="热门搜索"
      btn-text="换一批"
      :value="hotSearch"
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
import { search } from '@/api'
import { getStorageSync } from '@/api/wechat'
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
    }
  },
  data () {
    return {
      searchList: {},
      hotSearch: [],
      historySearch: [],
      searchFocus: true,
      openId: ''
    }
  },
  methods: {
    onChange (keyword) {
      if (!keyword || keyword.trim().length === 0) {
        return
      }
      this.onSearch(keyword)
    },
    onSearch (keyword) {
      search({
        keyword,
        openId: this.openId
      }).then(res => {
        this.searchList = res.data.data
      })
    },
    clearHistorySearch () {},
    searchkeyWord () {},
    onTagClick () {
      console.log('tag')
    },
    showBookDetail (text, index) {
      console.log(text, index)
    },
    changeHotSearch () {
      console.log('换一批')
    }
  },
  mounted () {
    this.openId = getStorageSync('openId')
  }
}
</script>

<style lang="scss" scoped>

</style>