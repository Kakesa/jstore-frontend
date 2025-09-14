import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import ThingsView from "../views/ThingsView.vue";
import CreateThing from "../views/CreateThing.vue";
import EditThing from "../views/EditThing.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/things", name: "Things", component: ThingsView },
  { path: "/create-thing", name: "CreateThing", component: CreateThing },
  { path: "/edit-thing/:id", name: "EditThing", component: EditThing, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
