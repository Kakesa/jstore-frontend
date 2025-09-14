import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";       // admin
import MyDashboard from "../views/MyDashboard.vue";   // utilisateur
import AllThings from "../views/AllThings.vue";
import CreateThing from "../views/CreateThing.vue";
import EditThing from "../views/EditThing.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/all-things", name: "AllThings", component: AllThings },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/dashboard", name: "Dashboard", component: Dashboard, meta: { requiresAuth: true, adminOnly: true } },
  { path: "/my-dashboard", name: "MyDashboard", component: MyDashboard, meta: { requiresAuth: true } },
  { path: "/create-thing", name: "CreateThing", component: CreateThing, meta: { requiresAuth: true } },
  { path: "/edit-thing/:id", name: "EditThing", component: EditThing, props: true, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protection routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!to.meta.requiresAuth) return next();
  if (!token) return next("/login");
  if (to.meta.adminOnly && role !== "admin") return next("/my-dashboard");
  next();
});

export default router;
