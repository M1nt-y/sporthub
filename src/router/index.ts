import {createRouter, createWebHistory} from 'vue-router'
import {loadLayoutMiddleware} from "@/router/middleware/loadLayout.middleware";
import {RouteNamesEnum} from "@/router/router.types";
import {AppLayoutsEnum} from "@/layouts/layouts.types";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNamesEnum.home,
      component: () => import("@/views/HomeView.vue")
    },
    {
      path: "/login",
      name: RouteNamesEnum.login,
      component: () => import("@/views/LoginView.vue"),
      meta: {
        layout: AppLayoutsEnum.auth,
      },
    },
    {
      path: "/signup",
      name: RouteNamesEnum.signup,
      component: () => import("@/views/SignupView.vue"),
      meta: {
        layout: AppLayoutsEnum.auth,
      },
    },
    {
      path: "/profile",
      name: RouteNamesEnum.profileEdit,
      component: () => import("@/views/ProfileEditView.vue")
    },
    {
      path: "/video-create",
      name: RouteNamesEnum.videoCreate,
      component: () => import("@/views/VideocreateView.vue")
    },
    {
      path: "/creator-video",
      name: RouteNamesEnum.creatorVideo,
      component: () => import("@/views/CreatorVideo.vue")
    },
    {
      path: "/creator-video/:id",
      name: RouteNamesEnum.editVideo,
      component: () => import("@/views/EditVideo.vue")
    },
    {
      path: "/playlist-create",
      name: RouteNamesEnum.playlistCreate,
      component: () => import("@/views/PlaylistCreate.vue")
    },
    {
      path: "/playlist-edit/:id",
      name: RouteNamesEnum.playlistEdit,
      component: () => import("@/views/PlaylistEdit.vue")
    },
    {
      path: "/videos/:id",
      name: RouteNamesEnum.userVideo,
      component: () => import("@/views/UserVideo.vue")
    },
  ]
})

router.beforeEach(loadLayoutMiddleware);

export default router
