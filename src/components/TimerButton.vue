<template lang="pug">
  Button(@click="pressBtn" :disabled="disabledFlag" ).btn {{textShow}}
</template>
<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component
export default class TimerButton extends Vue {
  disabledFlag = false;

  @Prop(Number)
  betweenTime;
  @Prop(String)
  beforeholder;
  @Prop(String)
  afterholder;
  @Prop(Function)
  todo;
  timer = null;
  remainingTime = 0;
  textShow = "";
  pressBtn() {
    this.disabledFlag = true;
    this.remainingTime = this.betweenTime;
    this.todo();
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.textShow = this.remainingTime;
        --this.remainingTime;
      } else {
        this.textShow = this.afterholder;
        this.disabledFlag = false;
      }
    }, 1000);
  }

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  mounted() {
    this.textShow = this.beforeholder;
  }
}
</script>
