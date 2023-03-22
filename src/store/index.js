import { createStore } from "vuex";

export default createStore({
  state: {
    collapsed: false,
    jurisdictionList: [
      "systemcltMonitor",
      "orderManagement",
      "taskManagement",
      "dataManagement",
      "statisticalAnalysis",
      "configurationManagement",
      "storageManagement",
      "dataSetManagement",
      "userAdminstratordir",
      "userAdminstrator",
      "jurisdiction",
      // "animationTable",
    ],
    buttonJurisdiction: [
      "taskManagementRetry",
      "taskManagementDelete",
      "taskManagementUrgent",
      "taskManagementCancel",
    ],
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
  actions: {},
  modules: {},
});
