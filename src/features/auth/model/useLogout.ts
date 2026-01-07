"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authClient } from "@/features/auth/lib/auth-client";

export const useLogout = (redirectUrl: string = "/") => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await authClient.signOut();
      router.push(redirectUrl);
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
};
