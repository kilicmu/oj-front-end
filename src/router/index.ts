import Vue from "vue";
import { getStorage } from "@/utils/storageUtils";
import { checkContestCode } from "@/api/index";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Problems from "@/views/Problems.vue";
import { clearPendingRequest } from "@/api/configedAxios";
const Answer = () => import("@/views/Answer.vue");
const Contest = () => import("@/views/Contest.vue");
const Status = () => import("@/views/Status.vue");
const User = () => import("@/views/User.vue");
const ContestCheck = () => import("@/views/ContestCheck.vue");
const Contesting = () => import("@/views/Contesting.vue");
const errorView = () => import("@/views/errorView.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/problems",
    name: "problems",
    component: Problems,
  },
  {
    path: "/problems/:pid",
    name: "answer",
    component: Answer,
    props: true,
  },
  {
    path: "/contest",
    name: "contest",
    component: Contest,
  },
  {
    path: "/status",
    name: "status",
    component: Status,
  },
  {
    path: "/user/:uname",
    name: "user",
    component: User,
  },
  {
    path: "/contestCheck/:clid",
    name: "contestcheck",
    component: ContestCheck,
  },
  {
    path: "/contest/:clid",
    name: "contesting",
    component: Contesting,
    beforeEnter: (to: any, from: any, next: any) => {
      const sessionStorage = getStorage("session");
      const clid = to.params.clid;
      if (!sessionStorage) {
        next(from);
      } else {
        const checkcode = sessionStorage.getItem("contestCheckCode");
        if (!checkcode) {
          next({ path: `/contestCheck/${clid}` });
        }
        checkContestCode(to.params.clid, checkcode as string).then(
          (res: any) => {
            // next();
            if (res.state !== "OK") {
              next({ path: `/contestCheck/${clid}` });
            } else {
              next();
            }
          }
        );
      }
    },
  },
  {
    path: "*",
    component: errorView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  clearPendingRequest();
  next();
});

export default router;
