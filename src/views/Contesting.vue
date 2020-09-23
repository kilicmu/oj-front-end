<template lang="pug">
  Row
    Col(span="10")
      problem-info
   
</template>
<script>
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { getStorage } from "@/utils/storageUtils";
import ProblemInfo from "@/components/TheProblemInfo.vue";
@Component({
  components: {
    "problem-info": ProblemInfo,
  },
})
export default class Contesting extends Vue {
  sessionStorage = null;

  toCheck() {
    // window.location.href = `/contestCheck/${this.$route.params.clid}`;
    this.$router.push(`/contestCheck/${this.$route.params.clid}`);
  }

  created() {
    this.sessionStorage = getStorage("session");
    const checkcode = this.sessionStorage.getItem("contestCheckCode");
    if (!checkcode) {
      this.toCheck();
    }
    this.$api
      .checkContestCode(this.$route.params.clid, checkcode)
      .then((res) => {
        if (res.state === "OK") {
          // TODO this.$api.getContestList()
          return;
        } else {
          this.toCheck();
        }
      })
      .catch(() => {
        this.toCheck();
      });
  }
}
</script>
<style lang="scss" scoped>
@import "~@/sass/config.scss";
</style>
