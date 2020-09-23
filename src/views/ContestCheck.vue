<template lang="pug" scoped>
Row
  Col(
    span="16"
  )
    Card.Info_card
      header.header # 测试名
      p.contest_check_info {{contestInfo.introduce}}
      p.rules_title 请记住比赛规则
      div.contest_rules 
        p.rules_content {{contestInfo.aggrement}}
      Checkbox(v-model="isAccept").check_to_accept 我遵守以上规定
  Col(
    span="8"
  )
    Card.timer
      p.timer_info 剩余时间
      div.timer_panel
        residual-panel(
          :beginStemp="1588744877099"
          :endStemp="1588756880576"
        ).panel
      div.time_label
        Time(class="contest_l_sub_time" :time="contestInfo.start" type="datetime") 
        strong  -
        Time(class="contest_l_sub_time" :time="contestInfo.end" type="datetime")
    Card.check_input
      Tooltip(content="邀请码可通过邮箱获得" placement="top-end").check_code_help
        Icon(type="md-help")
      p.check_title 快速加入
      check-input-group(
        :width="60"
        @is-full="checkIt"
      ).input_group 

      
</template>
<script>
import { Vue, Component } from "vue-property-decorator";
import { getStorage } from "@/utils/storageUtils";
import { State, Mutation, namespace } from "vuex-class";
import { throttle } from "@/utils/publicUtils";
import ResidualPanel from "@/components/ResidualPanel.vue";
import CheckInputGroup from "@/components/CheckInputGroup.vue";
const contestCheckInfo = namespace("contestCheckInfo");
@Component({
  components: {
    "residual-panel": ResidualPanel,
    "check-input-group": CheckInputGroup,
  },
})
export default class ContestCheck extends Vue {
  sessionStorage;
  time = {
    hour: "0",
    minutes: "0",
    seconds: "0",
  };
  clid = -1;
  throttle = throttle;
  isAccept = true;
  handleCheckRes = {
    OK: function(res) {
      this.$prompt("欢迎加入测试", "success");
      this.sessionStorage.setItem("contestCheckCode", res.checkCode);
      setTimeout(() => {
        // window.location.href = `/contest/${this.$route.params.clid}`;
        this.$router.push(`/contest/${this.$route.params.clid}`);
      }, 2000);
    },
    REFUSE: function() {
      this.$prompt("当前用户无权限参与");
    },
    DONT_MATCH: function() {
      this.$prompt("校验码不匹配，检查一下吧(测试码为1111)");
    },
  };

  contestInfo = {
    id: -1,
    start: 0,
    end: 0,
    title: "",
    introduce: "",
    aggrement: "",
  };

  mounted() {
    this.clid = this.$route.params.clid;
    this.sessionStorage = getStorage("session");
    if (this.sessionStorage) {
      const code = this.sessionStorage.getItem("contestCheckCode");
      if (code) {
        this.submitToCheck(code);
      } else {
        this.$prompt("请输入验证码加入", "warning");
      }
    }
  }

  checkIt(checkCode) {
    if (this.isAccept === false) {
      this.$prompt("请确认条例", "warning");
      return;
    }
    this.submitToCheck(checkCode);
  }

  submitToCheck(checkCode) {
    if (this.clid === -1) {
      return;
    }
    this.$api
      .checkContestCode(this.clid, checkCode)
      .then((res) => {
        Reflect.has(this.handleCheckRes, res.state)
          ? this.handleCheckRes[res.state].apply(this, [res])
          : this.$prompt("出了点问题呐");
      })
      .catch((e) => {
        this.$prompt("出了点问题呐");
      });
  }
}
</script>

<style lang="scss" scoped>
@import "~@/sass/config.scss";
.Info_card {
  margin-right: 10px;
  min-height: 800px;
  .header {
    color: $standard-primary;
    font-weight: bolder;
    font-size: 26px;
  }
  .rules_title {
    font-size: 18px;
    font-weight: bolder;
    color: $standard-title;
    margin-top: 15px;
  }

  .contest_rules {
    width: 100%;
    opacity: 30%;
    height: 700px;
    border: 1px solid rgba(99, 99, 99, 0.233);
    text-indent: 20px;
    overflow-y: scroll;
    .rules_content {
      font-size: 16px;
      line-height: 24px;
      color: #000;
    }
  }

  .check_to_accept {
    float: right;
    right: 10px;
    margin: 10px 0;
  }

  .contest_check_info {
    margin-top: 15px;
    font-size: 16px;
    text-indent: 20px;
    display: block;
  }
}

.Info_card::after {
  content: "";
  display: block;
  visibility: none;
  clear: both;
}
.timer {
  width: 100%;
  .timer_panel {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .timer_info {
    width: 100%;
    text-align: center;
    height: 50px;
    font-size: 20px;
    font-weight: bolder;
    padding: 10px 0;
    color: $standard-title;
  }
  .time_label {
    width: 100%;
    text-align: center;
  }
}
.check_input {
  margin-top: 20px;
  border-radius: 20px;
  // height: 80px;
  .check_title {
    width: 100%;
    height: 30px;
    font-size: 20px;
    color: $standard-title;
    width: 100%;
    text-align: center;
    font-weight: bolder;
  }
  .input_group {
    margin-top: 20px;
  }

  .explain {
    float: right;
    margin-top: 10px;
    opacity: 0.3;
  }
}

.check_input::after {
  content: "";
  visibility: none;
  right: 10px;
  clear: both;
  display: block;
}

.check_code_help {
  float: right;
}
</style>
