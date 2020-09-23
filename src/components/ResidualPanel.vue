<template lang="pug">
  i-circle(:percent="cPercent" :size="200" :stroke-color="color" dashboard).dashboard
    span(class="demo-circle-inner" style="font-size:24px").show_panel
      span {{hours | handleTime}}:
      span {{minutes | handleTime}}:
      span {{seconds | handleTime}}
</template>
<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component({ components: {} })
export default class ResidualPanel extends Vue {
  hours = "0";
  minutes = "0";
  seconds = "0";
  timer = null;
  color = "#5cb85c";

  cPercent = 100;

  @Prop(Number) endStemp;
  @Prop(Number) beginStemp;
  created() {
    if (this.beginStemp > this.endStemp) {
      this.$prompt("计时器参数有误");
      return;
    }
    /**
     * 判断是否过期
     */
    const endSeconds = Date.parse(new Date(this.endStemp)) / 1000;
    const beginSeconds = Date.parse(new Date(this.beginStemp)) / 1000;
    const allBetweenSeconds = endSeconds - beginSeconds;
    this.timer = setInterval(() => {
      const currentSeconds =
        Date.parse(new Date()) / 1000 > beginSeconds
          ? Date.parse(new Date()) / 1000
          : beginSeconds;
      const betweenSeconds = endSeconds - currentSeconds < 0 ? 0 : parseInt(endSeconds - currentSeconds);
      this.cPercent = betweenSeconds / allBetweenSeconds;
      if (this.cPercent < 60 && this.cPercent > 20) {
        this.color = "#ff5500";
      }
      if (this.cPercent < 20) {
        this.color = "#ff0000";
      }
      if (betweenSeconds <= 0) {
        clearInterval(this.timer);
        this.hours = "0";
        this.minutes = "0";
        this.seconds = "0";
        return;
      }
      const allS = betweenSeconds;
      const allM = Math.floor(allS / 60);
      const allH = Math.floor(allM / 60);
      this.hours = String(allH % 12);
      this.minutes = String(allM % 60);
      if (beginSeconds === currentSeconds) {
        this.seconds = "0";
      } else {
        this.seconds = String(allS % 60);
      }
    }, 1000);
  }

  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>
<style lang="scss" scoped>
@import "~@/sass/config.scss";
.show_panel {
  -webkit-user-select: none;
}
</style>
