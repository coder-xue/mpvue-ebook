<template>
  <div>
    <TagGroup
      header-text="热门搜索"
      btn-text="换一批"
      :value="value"
      @onBtnClick="changeHotSearch"
      @onTagClick="showBookDetail"
    />
    <SearchList :data="searchList"/>
  </div>
</template>

<script>
/* eslint-disable */
import Tag from '@/components/base/Tag'
import TagGroup from '@/components/base/TagGroup'
import SearchItem from '@/components/search/SearchItem'
import SearchTable from '@/components/search/SearchTable'
import SearchList from '@/components/search/SearchList'
export default {
  components: {
    Tag,
    TagGroup,
    SearchItem,
    SearchTable
  },
  data () {
    return {
      searchList: {}
    }
  },
  methods: {
    onTagClick () {
      console.log('tag')
    },
    showBookDetail (text, index) {
      console.log(text, index)
    },
    changeHotSearch () {
      console.log('换一批')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>