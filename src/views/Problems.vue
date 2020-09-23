<template lang="pug">
    Row(type="flex" justify="center" align="top").code-row-bg
      Col(span="18")
        Card.problem_left_card
          div.title
            strong Problem List:
            div.title_tags
              SearchAndFlush(:searchFn="searchFn" :flushFn="flushFn")#flush_and_search
            ProblemList(:problems="problems").question_list
            Page(
              show-elevator
              :current="stateProblemList.currentPage"
              :page-size="stateProblemList.onePageContent"
              placement="top"
              :total="stateProblemList.max"
              @on-change="turnPage"
            ).page_li
        //- Spin(size="large" fix v-if="!show_problems_list")
      Col(span="6").right_cards
        div
          Card(ref="progressCard").right_card_1
            p(slot="title") 您的进度
            ProblemsProcess.process
          Card.right_card_2
            p(slot="title") 头条
            router-link(v-for="item in stateHeadLinesContent" :key="item.id" :to="item.url").headLines {{item.title}}
          Card.right_card_3      
            p(slot="title") 标签
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import ProblemList from "@/components/TheProblemsList.vue";
import SearchAndFlush from "@/components/SearchAndFlush.vue";
import ProblemsProcess from "@/components/TheProblemsProcess.vue";
import { State, namespace } from "vuex-class";

const problemList = namespace("problemList");
const headLines = namespace("headLines");

@Component({
  components: {
    ProblemList,
    SearchAndFlush,
    ProblemsProcess,
  },
})
export default class Problems extends Vue {
  problems = [];

  @problemList.State((state) => state.onePageContent)
  stateOnePageContent;

  @problemList.State((state) => state)
  stateProblemList;

  @headLines.State((state) => state.content)
  stateHeadLinesContent;

  @problemList.Mutation("setProblemList")
  mutationSetProblemList;

  @problemList.Mutation("setProblemListPage")
  mutationSetProblemListPage;

  @problemList.Mutation("setProblemListSearchValue")
  mutationSetProblemListSearchValue;

  @headLines.Mutation("setHeadLines")
  mutationSetHeadLines;

  turnPage(pageNo) {
    window.scrollTo(0, 0);
    this.$api
      .asyncRequireList(
        "ProblemList",
        this.stateOnePageContent,
        pageNo,
        this.stateProblemList.searchVal
      )
      .then((res) => {
        this.mutationSetProblemList(res);
      });
  }

  created() {
    this.mutationSetProblemListSearchValue("");
    const p1 = this.$api.asyncRequireList(
      "ProblemList",
      this.stateOnePageContent
    );
    const p2 = this.$api.getHeadLines();

    Promise.allSettled([p1, p2]).then((res) => {
      for (const i in res) {
        if (res[i].status === "fulfilled") {
          switch (i) {
            case "0":
              this.mutationSetProblemList(res[i].value);
              break;
            case "1":
              this.mutationSetHeadLines(res[i].value);
              break;
          }
        } else {
          this.$prompt(res[i].reason.data);
        }
      }
    });
  }

  flushFn() {
    this.mutationSetProblemListSearchValue("");
    this.$api
      .asyncRequireList("ProblemList", this.stateOnePageContent)
      .then((res) => {
        this.mutationSetProblemList(res);
      });
  }

  searchFn(e) {
    this.mutationSetProblemListSearchValue(e.target.value);
    this.$api
      .asyncRequireList(
        "ProblemList",
        this.stateOnePageContent,
        1,
        this.stateProblemList.searchVal
      )
      .then((res) => {
        this.mutationSetProblemList(res);
      });
  }
}
</script>

<style lang="scss" scoped>
@import "~@/sass/config.scss";
.problem_left_card {
  position: relative;
  height: 100%;
}

.topic {
  font-weight: bolder;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: $standard-border;
}

.title {
  strong {
    font-size: 20px;
    color: $standard-title;
  }
  &_tags {
    position: absolute;
    top: 60px;
    left: 20px;
    right: 20px;
  }
}

.question_list {
  margin-top: 70px;
  margin-bottom: 120px;
  text-align: center;
  border: false;
  width: 100%;
}

.right_cards {
  top: 0;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  @for $i from 1 through 3 {
    .right_card_#{$i} {
      @if $i > 1 {
        margin-top: 5px;
      }
      margin-left: 10px;
    }
  }
  .headLines {
    width: 100%;
    font-size: 16px;
    word-break: keep-all; /* 不换行 */
    white-space: nowrap; /* 不换行 */
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
  }
}

.page_li {
  bottom: 60px;
  right: 40px;
  position: absolute;
}

#flush_and_search {
  float: right;
}

#title {
  text-align: left;
}
</style>
