// src/stores/auth.js
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    role: localStorage.getItem("role") || null
  }),
  actions: {
    async login(email, password) {
      const res = await axios.post("http://localhost:3000/api/auth/login", { email, password });
      this.token = res.data.token;
      this.userId = res.data.userId;
      this.role = res.data.role;
      localStorage.setItem("token", this.token);
      localStorage.setItem("userId", this.userId);
      localStorage.setItem("role", this.role);
    },
    async register(userData) {
      await axios.post("http://localhost:3000/api/auth/signup", userData);
    },
    logout() {
      this.token = null;
      this.userId = null;
      this.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
    }
  }
});
