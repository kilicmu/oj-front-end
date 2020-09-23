import Vue from "vue";
import Vuex from "vuex";
import api from "@/api";

import { Store } from "@/store/store.ts";
import { updateUserMsg } from "@/utils/formUtils";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    spin: {
      namespaced: true,
      state: () => ({
        showSpin: false,
      }),
      mutations: {
        beginLoad(state) {
          state.showSpin = true;
        },
        endLoad(state) {
          state.showSpin = false;
        },
      },
    },
    problemList: {
      namespaced: true,
      state: () => ({
        content: [],
        currentPage: 1,
        onePageContent: 30,
        max: 0,
        searchVal: "",
      }),
      mutations: {
        setProblemList(state, res: Store.ContentList<Store.ProblemItem[]>) {
          state.content = res.content;
          state.currentPage = Number(res.currentPage);
          state.onePageContent = Number(res.onePageContent);
          state.max = Number(res.max);
        },
        setProblemListPage(state, pageNo: number) {
          state.currentPage = pageNo;
        },
        setProblemListSearchValue(state, searchVal: string) {
          state.searchVal = searchVal;
        },
      },
    },
    headLines: {
      namespaced: true,
      state: () => ({
        content: [],
        status: "",
      }),
      mutations: {
        setHeadLines(state, headLines: Store.HeadLines) {
          state.content = JSON.parse(JSON.stringify(headLines.content));
          state.status = headLines.status;
        },
      },
    },
    user: {
      namespaced: true,
      state: () =>
        ({
          isLogin: false,
          name: "",
          mail: "",
          description: "",
          from: {
            province: {
              id: "",
              label: "",
            },
            city: {
              id: "",
              label: "",
            },
            county: {
              id: "",
              label: "",
            },
          },
          headPic: "",
          blogUrl: "",
          tags: [
            { id: 1, value: "标签1", empty: false },
            { id: 1, value: "标签2", empty: false },
            { id: 1, value: "标签3", empty: false },
          ],
          token: localStorage.getItem("token")
            ? localStorage.getItem("token")
            : "",
        } as Store.User),
      mutations: {
        setUserMsg(state, res: any) {
          state.name = res.name;
          updateUserMsg(state, res);
        },
        changeUserMsg(state, res: Store.PostUserMsg) {
          updateUserMsg(state, res);
        },
        setToken(state, token: any) {
          localStorage.token = token;
          state.user.token = token;
        },
        delToken(state) {
          state.user.token = "";
          localStorage.removeItem("token");
        },
      },
    },
    problemInfo: {
      namespaced: true,
      state: () => ({
        problemInfo: {
          id: 0,
          title: "",
          difficuly: 0,
          introduce: "",
          isPass: false,
          in: "",
          out: "",
          demo: [{ id: 0, in: "", out: "" }],
          limitTime: "",
          limitMemory: "",
          from: "",
          information: "",
        } as Store.ProblemInfo,
        answerScope: [{ type: "", code: "" } as Store.AnswerTypeItem],
      }),
      mutations: {
        setProblemInfo(state, res: Store.ProblemInfo) {
          state.problemInfo = JSON.parse(JSON.stringify(res));
        },
        setAnserScope(state, res: object) {
          state.answerScope = JSON.parse(JSON.stringify(res));
        },
        setAnserCode(state: any, typeItem: Store.AnswerTypeItem) {
          for (const _i of state.answerScope) {
            if (_i.type === typeItem.type) {
              _i.code = typeItem.code;
            }
          }
        },
      },
    },
    contest: {
      namespaced: true,
      state: () => ({
        contestList: {
          content: [],
          currentPage: 1,
          onePageContent: 10,
          max: 0,
          searchVal: "",
        } as Store.ContentList<Store.ContestItem[]>,
        contestingState: {
          isContesting: false,
          contestingURL: "",
        } as Store.ContestingState,
        contestAnnouncement: "",
      }),
      mutations: {
        setContestList(state, res: Store.ContentList<Store.ContestItem[]>) {
          state.contestList.content = res.content;
          state.contestList.currentPage = Number(res.currentPage);
          state.contestList.onePageContent = Number(res.onePageContent);
          state.contestList.max = Number(res.max);
        },

        setContestListSearchValue(state, searchVal: string) {
          state.contestList.searchVal = searchVal;
        },
        setContestingState(state, contestState: Store.ContestingState) {
          state.contestingState.isContesting = contestState.isContesting;
          state.contestingState.contestingURL = contestState.contestingURL;
        },
        setContestAnnouncement(state, Announcement: string) {
          state.contestAnnouncement = Announcement;
        },
        setContestListPage(state, pageNo: number) {
          state.contestList.currentPage = pageNo;
        },
      },
    },
    statusList: {
      namespaced: true,
      state: () => ({
        statusList: {
          content: [],
          currentPage: 1,
          onePageContent: 12,
          max: 0,
          searchVal: "",
        } as Store.ContentList<Store.StatusItem[]>,
      }),
      mutations: {
        setStatusList(state, res: Store.ContentList<Store.StatusItem[]>) {
          state.statusList.content = res.content;
          state.statusList.currentPage = Number(res.currentPage);
          state.statusList.onePageContent = Number(res.onePageContent);
          state.statusList.max = Number(res.max);
        },
        setStatusListPage(state, pageNo: number) {
          state.statusList.currentPage = pageNo;
        },
        setStatusListSearchValue(state, searchVal: string) {
          state.statusList.searchVal = searchVal;
        },
      },
    },
    // contestCheckInfo: {
    //   namespaced: true,
    //   state: () => ({
    //     contestCheckInfo: {
    //       id: "",
    //       title: "",
    //       info: "",
    //       begin: "",
    //       end: "",
    //     } as Store.ContestCheckInfo,
    //   }),
    //   mutations: {
    //     setContestCheckInfo(state, val: Store.ContestCheckInfo) {
    //       state.contestCheckInfo.id = val.id;
    //       state.contestCheckInfo.title = val.title;
    //       state.contestCheckInfo.info = val.info;
    //       state.contestCheckInfo.begin = val.begin;
    //       state.contestCheckInfo.end = val.end;
    //     },
    //   },
    // },
  },
});
