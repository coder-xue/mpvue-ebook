<template>
  <div>
    <TagGroup
      header-text="热门搜索"
      btn-text="换一批"
      :value="value"
      @onBtnClick="changeHotSearch"
      @onTagClick="showBookDetail"
    />
  </div>
</template>

<script>
import Tag from '@/components/base/Tag'
import TagGroup from '@/components/base/TagGroup'
export default {
  components: {
    Tag,
    TagGroup
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