"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { api } from "@/shared/api/instance";

export function InitAuth() {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (Cookies.get("jwt")) {
      api
        .get("/api/users/me", { withCredentials: true })
        .then(({ data }) => {
          console.log(data);

          queryClient.setQueryData(["user"], data);
        })
        .catch(() => {
          Cookies.remove("jwt");
          queryClient.setQueryData(["user"], null);
        });
    }
  }, [queryClient]);

  return null;
}
