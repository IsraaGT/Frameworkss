import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Crear from "../views/Crear.vue";
import Editar from "../views/Editar.vue";
import Listar from "../views/Listar.vue";
import Registrar from "../views/Registrar.vue";
import Bienvenido from "../views/Bienvenido.vue";
import Recuperar from "../views/Recuperar.vue";

const routes = [

  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Listar",
    name: "Listar",
    component: Listar,
  },
  {
    path: "/registrar",
    name: "Registrar",
    component: Registrar,
  },
  {
    path: "/recuperar",
    name: "Recuperar",
    component: Recuperar,
  },
  {
    path: "/crear",
    name: "Crear",
    component: Crear,
  },
  {
    path: "/editar/:id",
    name: "Editar",
    component: Editar,
  },
  {
    path: "/bienvenido/:id",
    name: "Bienvenido",
    component: Bienvenido,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
