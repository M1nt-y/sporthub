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
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: RouteNamesEnum.profileEdit,
          component: () => import("@/views/ProfileEditView.vue")
        },
        {
          path: 'stores',
          meta: {
            isCreator: true
          },
          name: RouteNamesEnum.profileStores,
          component: () => import("@/views/ProfileStoresView.vue")
        },
        {
          path: 'videos',
          meta: {
            isCreator: true
          },
          name: RouteNamesEnum.profileVideos,
          component: () => import("@/views/ProfileVideosView.vue")
        },
        {
          path: "videos/create",
          name: RouteNamesEnum.videoCreate,
          component: () => import("@/views/ProfileVideosCreateView.vue")
        },
        {
          path: "videos/:id",
          name: RouteNamesEnum.editVideo,
          component: () => import("@/views/ProfileVideosEditView.vue")
        },
        {
          path: "playlists/create",
          name: RouteNamesEnum.playlistCreate,
          component: () => import("@/views/ProfilePlaylistsCreate.vue")
        },
        {
          path: "playlists/:id",
          name: RouteNamesEnum.playlistEdit,
          component: () => import("@/views/ProfilePlaylistsEdit.vue")
        },
      ]
    },
    {
      path: "/videos/:id",
      name: RouteNamesEnum.userVideo,
      component: () => import("@/views/UserVideo.vue")
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (window.localStorage.getItem('isAuthorised')) {
      await loadLayoutMiddleware(to)
      next()
    } else {
      await loadLayoutMiddleware(from)
      next('/')
    }
  }
  // else if (to.matched.some((record) => record.meta.isCreator)) {
  //   if (window.localStorage.getItem('isCreator')) {
  //     next()
  //   }
  //   else {
  //     next('/')
  //   }
  // }
  else {
    await loadLayoutMiddleware(to)
    next()
  }
});

export default router
