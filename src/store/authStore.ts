import { create } from "zustand";
import { persist } from "zustand/middleware";
import $api from "@/api";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;

  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      loading: false,
      error: null,

      get isAuthenticated() {
        return Boolean(get().token);
      },

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const resp = await $api.post<{
            token: string;
            user: User;
          }>("/auth/login", { email, password });

          set({
            token: resp.data.token,
            user: resp.data.user,
            loading: false,
          });
        } catch (err: any) {
          set({
            error: err.response?.data?.message || err.message || "Login failed",
            loading: false,
          });
          throw err;
        }
      },

      logout: () => {
        set({ token: null, user: null, error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
