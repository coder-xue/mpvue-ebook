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
    this.page = 1
    this.getSearchList()
    const { title } = this.$route.query
    setNavigationBarTitle(title) // 设置导航标题
  },
  // 监听用户上拉触底事件
  onReachBottom () {
    this.page++
    this.getSearchList()
  },
  // 页面显示/切入前台时触发
  onShow () {
    this.data = [] // 初始化数据
  }
}
</script>

<style>

</style>