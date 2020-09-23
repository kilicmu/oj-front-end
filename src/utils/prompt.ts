export default {
  install(vue: any){
    vue.prototype.$prompt = function(msg: string, type: string) {
      if (["success", "warning", "error"].includes(type)) {
        this.$Message[type]({
          background: true,
          content: msg ? msg : type,
        });
      } else {
        this.$Message["error"]({
          background: true,
          content: msg ? msg : type,
        });
      }
    };
  }
}