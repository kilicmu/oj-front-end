<template lang="pug">
  Form(ref="formInline" :model="changePasswordForm" :rules="changePasswordRule" v-if="changePasswd" inline).change_password
    FormItem(prop="user").userinput
      Input(type="text" v-model="changePasswordForm.user" placeholder="username/email")
        Icon(type="ios-person-outline" slot="prepend")
    FormItem(prop="checkCode").code
      Input(type="text" v-model="changePasswordForm.checkCode" placeholder="check code" )
    FormItem.send
      //- Button(type="info" style="width:100%" @click="sendCode") send
      timer-button(beforeholder="send", afterholder="resend", :betweenTime="3" :todo="sendEMail").timer_button
    FormItem.confirm
      Button(type="primary" style="width:100%" @click="changePassword") 提交
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import TimerButton from "@/components/TimerButton.vue";

@Component({
  components: {
    "timer-button": TimerButton
  }
})
export default class SignIn extends Vue {
  @Prop({ type: Boolean, default: false })
  changePasswd;
  /**
   * 修改密码信息记录，user为用户名，checkCode为校验码
   */
  changePasswordForm = {
    user: "",
    checkCode: ""
  };
  /**
   * 处理输入内容的正则
   */
  changePasswordRule = {
    user: [
      {
        required: true,
        message: "用户名不可为空",
        trigger: "blur"
      }
    ],
    checkCode: [
      {
        required: true,
        message: "验证码不可为空",
        trigger: "blur"
      }
    ]
  };

  changePassword() {
    this.$prompt("暂时无法提交数据");
  }

  sendEMail() {
    // this.$api.sendEmail(this.changePasswordForm.user).catch(e => {
    //   this.$prompt(e);
    // });
    this.$prompt("暂时无法发送邮件");
  }
}
</script>

<style lang="scss" scoped>
.change_password {
  .change_password_userinput {
    width: 100%;
  }
  .userinput {
    width: 100% !important;
  }
  .code {
    width: 220px;
    float: left;
  }
  .send {
    width: 125px;
    float: right;
    .timer_button {
      width: 100%;
    }
  }

  .confirm {
    width: 100%;
  }
}
</style>
