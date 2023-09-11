import { createRouter, createWebHistory } from 'vue-router'
import { loadLayoutMiddleware } from "@/router/middleware/loadLayout.middleware";
import { RouteNamesEnum } from "@/router/router.types";
import { AppLayoutsEnum } from "@/layouts/layouts.types";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNamesEnum.home,
      component: () => import("@/views/HomeView.vue")
    },
    {
      path: "/auth",
      name: RouteNamesEnum.auth,
      component: () => import("@/views/AuthView.vue"),
      meta: {
        layout: AppLayoutsEnum.auth,
      },
    },
  ]
})

router.beforeEach(loadLayoutMiddleware);

export default router
