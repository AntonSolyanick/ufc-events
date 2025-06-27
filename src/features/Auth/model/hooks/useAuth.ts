import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

import { api } from "@/shared/api/instance";
import { Fighter } from "@/entities/Fighter/model/types/fighter";
import axios from "axios";
import { BaseAuthFormData, SignUpFormData } from "../types";

interface User {
  _id: string;
  name: string;
  email: string;
  favouriteFighters: Fighter[];
}

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: SignUpFormData) => {
      try {
        const { data } = await api.post<{ jwt: string; user: User }>(
          "/users/signup",
          payload
        );
        return data;
      } catch (error) {
        throw new Error(
          axios.isAxiosError(error)
            ? error.response?.data?.message || "Ошибка регистрации"
            : "Ошибка сети"
        );
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      router.refresh();
    },
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: BaseAuthFormData) => {
      try {
        const { data } = await api.post("/users/signin", credentials);
        return data;
      } catch (error) {
        console.error("Login error:", error);
        throw new Error(
          axios.isAxiosError(error)
            ? error.response?.data?.message || "Ошибка авторизации"
            : "Ошибка сети"
        );
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      router.refresh();
      return data;
    },
    onError: (error: Error) => {
      console.error(error);
      queryClient.setQueryData(["user"], null);
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await api.get("/users/signout");
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      queryClient.setQueryData(["user"], null);
    },
  });
};

const useBaseAuth = (options?: UseQueryOptions<User | null>) => {
  return useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/users/me", {
          withCredentials: true,
        });
        return data.document ?? null;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          Cookies.remove("jwt");
        }

        return null;
      }
    },
    staleTime: 1000 * 60 * 10,
    retry: 1,
    ...options,
  });
};

export const useUser = () => useBaseAuth();

export const useCheckAuth = () =>
  useBaseAuth({
    retry: false,
    enabled: !!Cookies.get("jwt"),
    staleTime: Infinity,
    queryKey: ["user"],
  });
