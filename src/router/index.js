import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import ThingsView from "../views/ThingsView.vue";
import CreateThing from "../views/CreateThing.vue";
import EditThing from "../views/EditThing.vue";
import AllThings from "../views/AllThings.vue"; // Nouvelle vue publique

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/dashboard", name: "Dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/things", name: "Things", component: ThingsView },
  { path: "/create-thing", name: "CreateThing", component: CreateThing, meta: { requiresAuth: true } },
  { path: "/edit-thing/:id", name: "EditThing", component: EditThing, props: true, meta: { requiresAuth: true } },
  { path: "/all-things", name: "AllThings", component: AllThings }, // Route publique pour tous les objets
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protection des routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (!to.meta.requiresAuth) return next();

  if (!token) return next("/login");

  const userRole = localStorage.getItem("role"); // stocké à la connexion

  if (to.meta.adminOnly && userRole !== "admin") {
    return next("/my-dashboard"); // redirige les utilisateurs normaux
  }

  next();
});


export default router;
