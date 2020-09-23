<template lang="pug">
  Card.card
    img(src="~@/images/404.png" alt="404" height="800").img_404
    Button(type="primary" ghost to="/").return_button 返回首页
</template>
<script>
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component({ components: {} })
export default class ErrorView extends Vue {}
</script>
<style lang="scss" scoped>
.card {
  text-align: center;
  position: relative;
  .return_button {
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }
}
</style>
