<template lang="pug">
div
  div.tools
    Select(v-model="selectType" style="width:160px").selecter
      Option(v-for="item, key in types" :value="item.value" :key="key") {{ item.label }}
    Select(v-model="lTerminal" style="width:80px").selecter
      Option(v-for="item,key in terminals"
        :value="item.value"
        :key="key") {{ item.label }}
    div.buttons
      Tooltip(content="上传").buttons
        Upload(action="#" :before-upload="handleUpload")
          Button(icon="ios-cloud-upload-outline" shape="circle")
      Tooltip(content="清空").buttons
        Button(icon="md-refresh" @click.prevent="cleanTypeCodeMap" shape="circle")
  div(ref="editor-scope")#textarea-m
    MonacoEditor(
      :width="editorWidth"
      height="750"
      :theme="lTerminal"
      v-model.lazy="uploadForm.code"
      :language="selectType").edit_space
</template>
<script>
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import MonacoEditor from "monaco-editor-vue";
@Component({
  components: {
    MonacoEditor
  }
})
export default class EditScope extends Vue {
  editorWidth = "";
  currentCode = "";
  resizeEditTimer = null;

  @Prop(String)
  pid;

  /**
   * edit配置
   */
  types = [];

  selectType = "C";
  uploadForm = { type: "C", code: "" };

  terminals = [
    { value: "vs", label: "vs" },
    { value: "vs-dark", label: "vs-dark" },
    { value: "hc-black", label: "hc-black" }
  ];
  lTerminal = "vs";

  typeCodeMap = {};

  @Watch("uploadForm.code")
  updateForm(after, before) {
    console.log(after, before);
  }

  @Watch("selectType")
  selectTypeChanged(after, before) {
    this.typeCodeMap[before] = this.uploadForm.code; // code数据备份
    this.uploadForm.type = after;
    this.uploadForm.code = this.typeCodeMap[after];
  }

  cleanTypeCodeMap() {
    this.uploadForm.code = "";
    Object.keys(this.typeCodeMap).forEach(item => {
      this.typeCodeMap[item] = "";
    });
  }

  handleUpload(file) {
    const reader = new FileReader();
    if (typeof FileReader === "undefined") {
      this.$Message.error("您的浏览器不支持FileReader接口");
      return false;
    }
    reader.readAsText(file, "utf8");
    reader.onload = () => {
      this.uploadForm.code = reader.result;
    };
    return false;
  }

  initializeTypeCodeMap(tmpMap) {
    for (const item of tmpMap) {
      this.typeCodeMap[item["type"]] = item["code"];
    }
  }

  resizeEdit = () => {
    this.editorWidth = this.$refs["editor-scope"].offsetWidth;
  };

  mounted() {
    this.editorWidth = this.$refs["editor-scope"].offsetWidth.toString();
    window.addEventListener("resize", this.resizeEdit);
  }

  created() {
    this.$api.getAnswerScope(this.pid).then(res => {
      // 处理type元素
      for (const item of res) {
        const tmp = {};
        tmp["label"] = tmp["value"] = item.type;
        this.types.push(tmp);
      }
      this.initializeTypeCodeMap(res);
    });
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.resizeEdit);
  }
}
</script>

<style lang="scss" scoped>
.tools {
  .selecter {
    float: left;
  }
  .buttons {
    margin-left: 10px;
  }
}

#textarea-m {
  margin-top: 20px;
}
</style>
