import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue")
    },
    {
      path: "/grid",
      name: "Grid",
      component: () => import(/* webpackChunkName: "grid" */ "@/views/Grid.vue")
    },
    {
      path: "/exif",
      name: "Exif",
      component: () => import(/* webpackChunkName: "exif" */ "@/views/Exif.vue")
    },
  ]
});
export default router;
