<template lang="pug">
  Form(ref="formInline" :model="signUpForm" :rules="signUpRule" v-if="signUp").login_form
    FormItem(prop="user")
      Input(type="text" v-model="signUpForm.user" placeholder="username")
        Icon(type="ios-person-outline" slot="prepend")
    FormItem(prop="email")
      Input(type="text" v-model="signUpForm.email" placeholder="email")
        Icon(type="ios-person-outline" slot="prepend")
    FormItem(prop="password")
      Input(type="password" v-model="signUpForm.password" placeholder="password")
        Icon(type="ios-lock-outline" slot="prepend")
    FormItem
      Button(type="primary" style="width:100%" @click="signUpBtn") 注册
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SignUp extends Vue {
  @Prop({ type: Boolean, default: false })
  signUp;

  signUpForm = {
    user: "",
    email: "",
    password: ""
  };

  signUpBtn() {
    this.$prompt("暂时无法注册");
  }

  signUpRule = {
    user: [
      {
        required: true,
        message: "请输入用户名",
        trigger: "blur"
      }
    ],
    email: [
      {
        required: true,
        message: "请输入邮箱",
        trigger: "blur"
      },
      {
        type: "email",
        message: "请求确定邮箱格式",
        trigger: "blur"
      }
    ],
    password: [
      {
        required: true,
        message: "请输入密码",
        trigger: "blur"
      },
      {
        type: "string",
        min: 6,
        message: "密码不可少于6位",
        trigger: "blur"
      }
    ]
  };
}
</script>

<style scoped></style>
