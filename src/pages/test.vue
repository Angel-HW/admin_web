<template>
  <div id="test">
    <h1>测试页面</h1>
    <div>{{ this.result.str }}</div>
    <div>{{ this.result.length }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      result: {}
    }
  },
  methods: {
    ascncAwait () {
      const res = this.$http.post('/user/login')
      console.log(res)
    }
  },
  created () {
    this.ascncAwait()
  }
}
</script>
