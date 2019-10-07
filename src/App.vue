<template>
  <div id="app">
    <!-- collapse 展开折叠过渡动画 -->
    <el-collapse-transition>
      <router-view/>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {

    }
  },
  created () {
    let lang = navigator.language.toLowerCase()

  }
}
</script>
