import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
// const RouteView = {
//   name: "RouteView",
//   render: (h) => h("router-view"),
// };
const routes = [
  {
    path: "/",
    redirect: "/home/systemcltMonitor",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home"),
    children: [
      {
        path: "/home/systemcltMonitor",
        name: "systemcltMonitor",
        component: () => import("../views/systemcltMonitor/systemcltMonitor"),
        meta: { title: "系统监控", permission: "systemcltMonitor" },
      },
      {
        path: "/home/orderManagement",
        name: "orderManagement",
        component: () => import("../views/orderManagement/"),
        meta: { title: "订单管理", permission: "orderManagement" },
      },
      {
        path: "/home/taskManagement",
        name: "taskManagement",
        component: () => import("../views/taskManagement/"),
        meta: { title: "任务管理", permission: "taskManagement" },
      },
      {
        path: "/home/userAdminstrator",
        name: "userAdminstrator",
        component: () => import("../views/userAdminstrator/"),
        meta: { title: "用户管理", permission: "userAdminstrator" },
      },
      {
        path: "/home/jurisdiction",
        name: "jurisdiction",
        component: () => import("../views/jurisdiction/"),
        meta: { title: "权限管理", permission: "jurisdiction" },
      },
      {
        path: "/home/dataManagement",
        name: "dataManagement",
        component: () => import("../views/dataManagement/"),
        meta: { title: "数据管理", permission: "dataManagement" },
      },
      {
        path: "/home/statisticalAnalysis",
        name: "statisticalAnalysis",
        component: () => import("../views/statisticalAnalysis/"),
        meta: { title: "统计分析", permission: "statisticalAnalysis" },
      },
      {
        path: "/home/storageManagement",
        name: "storageManagement",
        component: () =>
          import("../views/configurationManagement/storageManagement"),
        meta: { title: "存储管理", permission: "storageManagement" },
      },
      {
        path: "/home/dataSetManagement",
        name: "dataSetManagement",
        component: () =>
          import("../views/configurationManagement/dataSetManagement"),
        meta: { title: "数据集管理", permission: "dataSetManagement" },
      },
      {
        path: "/home/animationTable",
        name: "animationTable",
        component: () => import("../views/animationTable/index.vue"),
        meta: { title: "表格动画", permission: "animationTable" },
      },
      {
        path: "/error",
        name: "error",
        component: () => import("../views/error.vue"),
        meta: { title: "error", permission: "error" },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/user/Login.vue"),
    meta: { title: "登陆", permission: "login" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  base: "/haiyang/",
});
const errorRouterHandle = ["error", "login"];
router.beforeEach((to, from, next) => {
  if (store.state.jurisdictionList.includes(to.meta.permission)) {
    next();
  } else if (errorRouterHandle.includes(to.meta.permission)) {
    next();
  } else {
    next("/error");
  }
});
export default router;
