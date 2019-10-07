//全屏--组件
<template>
  <div>
    <i class="iconfont iconquanping"
       style="color:#5a5e66;font-size:1rem"
       @click='click'></i>
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "screenfull",
  data () {
    return {};
  },
  methods: {
    click () {
      if (!screenfull.enabled) {
        this.$message({
          message: '您的浏览器不支持全屏',
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
    }
  }
};
</script>
