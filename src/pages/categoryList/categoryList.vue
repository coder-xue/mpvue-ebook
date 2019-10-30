<template>
  <div>
    <HomeBook 
      :row="category.length / 2"
      :col="2"
      :data="category"
      mode="category"
      :showBtn="false"
      :showTitle="false"
    />
  </div>
</template>

<script>
import HomeBook from '@/components/home/HomeBook'
import { categoryList } from '@/api'
export default {
  components: {
    HomeBook
  },
  data () {
    return {
      category: []
    }
  },
  mounted () {
    categoryList().then(res => {
      this.category = res.data.data
    })
  }
}
</script>

<style>

</style>