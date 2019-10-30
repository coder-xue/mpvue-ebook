<template>
  <div>
    <SearchTable :data="data"/>
  </div>
</template>

<script>
import SearchTable from '@/components/search/SearchTable'
import { setNavigationBarTitle, showToast } from '@/api/wechat'
import { searchList } from '@/api'
export default {
  components: {
    SearchTable
  },
  data () {
    return {
      data: [],
      page: 1
    }
  },
  methods: {
    getSearchList () {
      const { key, text } = this.$route.query
      const params = {}
      if (key && text) {
        params[key] = text
      }
      params.page = this.page
      searchList(params).then(res => {
        const { data } = res.data
        if (data.length > 0) {
          this.data.push(...data)
        } else {
          showToast('没有更多了')
        }
      })
    }
  },
  mounted () {
    this.getSearchList()
    const { title } = this.$route.query
    setNavigationBarTitle(title) // 设置导航标题
  },
  onReachBottom () {
    this.page++
    this.getSearchList()
  }
}
</script>

<style>

</style>