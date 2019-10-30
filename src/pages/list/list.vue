<template>
  <div>
    <SearchTable :data="data"/>
  </div>
</template>

<script>
import SearchTable from '@/components/search/SearchTable'
import { setNavigationBarTitle } from '@/api/wechat'
import { searchList } from '@/api'
export default {
  components: {
    SearchTable
  },
  data () {
    return {
      data: []
    }
  },
  methods: {
    getSearchList () {
      const { key, text } = this.$route.query
      const params = {}
      if (key && text) {
        params[key] = text
      }
      searchList(params).then(res => {
        this.data = res.data.data
      })
    }
  },
  mounted () {
    this.getSearchList()
    const { title } = this.$route.query
    setNavigationBarTitle(title) // 设置导航标题
  }
}
</script>

<style>

</style>