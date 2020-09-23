<style lang="scss" scoped>
.r_card {
  margin-left: 10px;
  .button_group {
    float: right;
  }
}

#give_up_button {
  margin-right: 10px;
}
</style>
<template lang="pug">
    Row
      Col(span="10")
        ProblemInfo 
      Col(span="14")
        Card.r_card
          div.button_group
            Button(type="warning" id="give_up_button" @click.prevent="isGiveUp=true") GIVE UP
            Button(type="success" @click.prevent="subit") SUBMIT
            Modal(v-model="isGiveUp" title="提示" @on-ok="giveUp")
              p 确认要放弃吗?
          edit-scope.edit_scope
        
</template>
<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import MonacoEditor from "monaco-editor-vue";
import ProblemInfo from "@/components/TheProblemInfo.vue";
import EditScope from "@/components/TheEditScope.vue";
import { throttle } from "@/utils/publicUtils";
import { State, Mutation, namespace } from "vuex-class";
import VueClipboard from "vue-clipboard2";

const problemInfo = namespace("problemInfo");
const user = namespace("user");

@Component({
  components: {
    ProblemInfo,
    MonacoEditor,
    "edit-scope": EditScope,
  },
})
export default class Answer extends Vue {
  @Prop(String)
  pid;

  @user.State((state) => state)
  stateUser;

  @State("userProblemCode")
  stateUserProblemCode;

  @Mutation("setProblemCode")
  mutationSetProblemCode;

  @problemInfo.Mutation("setProblemInfo")
  mutationSetProblemInfo;

  isGiveUp = false;

  subit = throttle(this.submit, 2000);

  submit() {
    if (!this.stateUser.isLogin) {
      this.$prompt("请先登录一下吧", "warning");
      return;
    }
    this.$api
      .submitProblem(this.stateUserProblemCode)
      .then((res) => {
        //TODO after answer submit
        this.$prompt("提交成功！", "success");
        // window.location.href = `/postedProblem/${res.user}/${res.problemId}`;
        this.$router.push(`/postedProblem/${res.user}/${res.problemId}`);
      })
      .catch((err) => {
        this.$prompt("服务器溜号了，一会试试？", "error");
      });
  }

  handleTabsAdd() {
    this.tabs++;
  }

  handleUpload(file) {
    const reader = new FileReader();
    if (typeof FileReader === "undefined") {
      this.$Message.error("您的浏览器不支持FileReader接口");
      return false;
    }
    reader.readAsText(file, "utf8");
    reader.onload = () => {
      this.mutationSetProblemCode(reader.result);
    };
    return false;
  }

  giveUp() {
    // window.location.href = "/problems";
    this.$router.push("/problems");
  }

  mounted() {
    // this.editorWidth = document
    //   .getElementById("textarea-m")
    //   .offsetWidth.toString();
    // window.onresize = () => {
    //   this.editorWidth = document
    //     .getElementById("textarea-m")
    //     .offsetWidth.toString();
    // };
  }
  created() {
    this.$api.getProblemInfo(this.pid).then((res) => {
      this.mutationSetProblemInfo(res);
    });
  }
}
</script>
