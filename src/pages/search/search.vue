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
      icon="bars"
    />
    <SearchTable :data="list"/>
  </div>
</template>

<script>
/* eslint-disable */
import Tag from '@/components/base/Tag'
import TagGroup from '@/components/base/TagGroup'
import SearchItem from '@/components/search/SearchItem'
import SearchTable from '@/components/search/SearchTable'
export default {
  components: {
    Tag,
    TagGroup,
    SearchItem,
    SearchTable
  },
  data () {
    return {
      value: ['111', '222', '333', 'dfdsfsdfsdfffffffffffffffff'],
      list: [
              {
                "id":225,
                "fileName":"2016_Book_MicrofinanceEUStructuralFundsA",
                "cover":"https://www.youbaobao.xyz/book/res/img/Economics/2016_Book_MicrofinanceEUStructuralFundsA.jpeg",
                "title":"Microfinance, EU Structural Funds and Capacity Building for Managing Authorities",
                "author":"Giovanni Nicola Pes",
                "publisher":"Palgrave Macmillan",
                "bookId":"2016_Book_MicrofinanceEUStructuralFundsA",
                "category":3,
                "categoryText":"Economics",
                "language":"en",
                "rootFile":"OEBPS/9781137536013.opf"
              },
              {
                "id":88,
                "fileName":"2018_Book_BetweenMobilityAndMigration",
                "cover":"https://www.youbaobao.xyz/book/res/img/SocialSciences/978-3-319-77991-1_CoverFigure.jpg",
                "title":"Between Mobility and Migration",
                "author":"Peter Scholten",
                "publisher":"Springer International Publishing",
                "bookId":"2018_Book_BetweenMobilityAndMigration",
                "category":2,
                "categoryText":"SocialSciences",
                "language":"en",
                "rootFile":"OEBPS/package.opf"
              }
            ]
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