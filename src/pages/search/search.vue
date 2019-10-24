<template>
  <div>
    <Tag text="测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本" @onClick="onTagClick"/>
  </div>
</template>

<script>
import Tag from '@/components/base/Tag'
export default {
  components: {
    Tag
  },
  methods: {
    onTagClick () {
      console.log('tag')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>