import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Customer",
    component: () => import("../views/CustomerView.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/SettingsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
