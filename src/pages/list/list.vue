<template>
  <div>
    <SearchTable :data="data"/>
  </div>
</template>

<script>
import SearchTable from '@/components/search/SearchTable'
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
  }
}
</script>

<style>

</style>