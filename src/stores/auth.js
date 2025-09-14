import { defineStore } from "pinia";
import api from "../api/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async login(email, password) {
      const res = await api.post("/auth/login", { email, password });
      this.token = res.data.token;
      localStorage.setItem("token", this.token);
      this.user = res.data.user;
    },
    async register(email, password) {
      const res = await api.post("/auth/signup", { email, password });
      return res.data;
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});
