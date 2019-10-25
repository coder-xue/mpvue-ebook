<template>
  <div>
    <TagGroup
      header-text="热门搜索"
      btn-text="换一批"
      :value="value"
      @onBtnClick="changeHotSearch"
      @onTagClick="showBookDetail"
    />
    <SearchItem 
      title="计算机与科学"
      subTitle="html"
      icon="comment"
    />
  </div>
</template>

<script>
import Tag from '@/components/base/Tag'
import TagGroup from '@/components/base/TagGroup'
import SearchItem from '@/components/search/SearchItem'
export default {
  components: {
    Tag,
    TagGroup,
    SearchItem
  },
  data () {
    return {
      value: ['111', '222', '333', 'dfdsfsdfsdfffffffffffffffff']
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