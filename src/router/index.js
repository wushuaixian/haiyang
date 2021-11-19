import { createRouter, createWebHistory } from "vue-router";
// const RouteView = {
//   name: "RouteView",
//   render: (h) => h("router-view"),
// };
const routes = [
  {
    path: "/",
    redirect: "/home/systemcltMonitor",
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
        path: "/orderManagement",
        name: "orderManagement",
        component: () => import("../views/orderManagement/"),
        meta: { title: "订单管理", permission: "orderManagement" },
      },
      {
        path: "/taskManagement",
        name: "taskManagement",
        component: () => import("../views/taskManagement/"),
        meta: { title: "任务管理", permission: "taskManagement" },
      },
      {
        path: "/userAdminstrator",
        name: "userAdminstrator",
        component: () => import("../views/userAdminstrator/"),
        meta: { title: "用户管理", permission: "userAdminstrator" },
      },
      {
        path: "/jurisdiction",
        name: "jurisdiction",
        component: () => import("../views/jurisdiction/"),
        meta: { title: "权限管理", permission: "jurisdiction" },
      },
      {
        path: "/dataManagement",
        name: "dataManagement",
        component: () => import("../views/dataManagement/"),
        meta: { title: "数据管理", permission: "dataManagement" },
      },
      {
        path: "/statisticalAnalysis",
        name: "statisticalAnalysis",
        component: () => import("../views/statisticalAnalysis/"),
        meta: { title: "统计分析", permission: "statisticalAnalysis" },
      },
      {
        path: "/storageManagement",
        name: "storageManagement",
        component: () =>
          import("../views/configurationManagement/storageManagement"),
        meta: { title: "存储管理", permission: "storageManagement" },
      },
      {
        path: "/dataSetManagement",
        name: "dataSetManagement",
        component: () =>
          import("../views/configurationManagement/dataSetManagement"),
      meta: { title: "数据集管理", permission: "dataSetManagement" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  base: "/haiyang/",
});
router.beforeEach((to, from, next) => {
  console.log(to, from)
  next()
})
export default router;
