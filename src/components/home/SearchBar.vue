<template>
  <div class="search-bar" @click="onSearchBarClick">
    <div class="search-bar-wrapper">
      <van-icon 
        class="search"
        name="search"
        size="16px"
        color="#858c96"></van-icon>
      <input 
        class="search-bar-input"
        :focus="focus"
        :maxlength="limit"
        :disabled="disabled"
        v-model="searchWord"
        :placeholder="hotSearch.length === 0 ? '搜索' : hotSearch"
        @input="onChange"
        confirm-type="search"
        @confirm="onConfirm"
        placeholder-style="color: #ADB4BE"
        />
      <van-icon 
        class="clear"
        name="clear"
        size="16px"
        color="#ccc"
        @click="onClearClick"
        v-if="searchWord.length > 0"></van-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    focus: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 10
    },
    hotSearch: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchWord: ''
    }
  },
  methods: {
    onSearchBarClick () {
      this.$emit('onClick')
    },
    onClearClick () {
      this.searchWord = ''
      this.$emit('onClear')
    },
    onChange (e) {
      const { value } = e.mp.detail
      this.$emit('onChange', value)
    },
    // 点击完成按钮时触发
    onConfirm (e) {
      const { value } = e.mp.detail
      this.$emit('onConfirm', value)
    },
    setValue (v) {
      this.searchWord = v
    },
    getValue () {
      return this.searchWord
    }
  }
}
</script>

<style lang="scss" scope>
.search-bar {
  padding: 15px 15.5px;
  .search-bar-wrapper {
    display: flex;
    align-items: center;
    height: 40px;
    box-sizing: border-box;
    background: #F5F7F9;
    border-radius: 20px;
    padding: 12px 17px;

    .search-bar-input {
      flex: 1;
      margin: 0 8px;
    }
    .search, .clear {
      display: flex;
      height: 100%;
      align-items: center;
    }
  }
}
</style>