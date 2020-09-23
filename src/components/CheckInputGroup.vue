<template lang="pug" scoped>
    div.root
        input(
          type="text" 
          maxlength="1" 
          v-for="item in inputArray" 
          :key="item.key"
          v-model="item.value"
          :ref="'k-gInput'+item.key"
          @keydown.prevent="afterInput($event, item.key)"
          οnkeyup="this.value=this.value.replace(/\D/g,'')"
          readonly="readonly"
        ).input_item
</template>
<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component({ components: {} })
export default class CheckInputGroup extends Vue {
  entireCode = "";
  inputArray = [
    {
      key: 0,
      value: ""
    },
    {
      key: 1,
      value: ""
    },
    {
      key: 2,
      value: ""
    },
    {
      key: 3,
      value: ""
    }
  ];
  @Prop(Number) width;

  handleEntireCode() {
    this.entireCode = "";
    for (const item of this.inputArray) {
      this.entireCode += item.value;
    }
    if (this.entireCode.length < 4) {
      this.$prompt(`校验码长度不足`);
      this.initInputs();
      return;
    }
    this.$emit("is-full", this.entireCode);
    this.initInputs();
  }

  afterInput(e, i) {
    /**仅支持输入数值 */
    const keyCode = e.keyCode;
    if (keyCode < 48 || keyCode > 57) {
      this.inputArray[i].value = "";
      return;
    }
    this.inputArray[i].value = e.key;
    const next = i + 1;
    if (next < this.inputArray.length) {
      this.$refs["k-gInput" + next][0].focus();
    } else {
      this.handleEntireCode();
    }
    //清空后面的值
    for (let j = next; j < this.inputArray.length; ++j) {
      this.inputArray[j].value = "";
    }
  }

  mounted() {
    this.initInputs();
  }

  initInputs() {
    for (let i = 0; i < this.inputArray.length; ++i) {
      this.inputArray[i].key = i;
      this.inputArray[i].value = "";
    }
    this.$refs["k-gInput0"][0].focus();
  }
}
</script>
<style lang="scss" scoped>
@import "~@/sass/config.scss";
input {
  border: 1px solid #dcdee2e3;
  transition: all 0.2s;
}
input:focus {
  border: 1px solid lighten($standard-primary, 30%);
  box-shadow: 1px 1px 1px lighten($standard-primary, 30%);
}
.root {
  display: flex;
  height: 40px;
  width: 100%;
  flex-flow: row nowrap;
  justify-content: space-around;
  .input_item {
    width: 40px;
    font-size: 30px;
    text-align: center;
    color: $standard-context;
    caret-color: rgba(128, 128, 128, 0.438);
  }
}
</style>
