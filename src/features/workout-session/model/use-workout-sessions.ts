"use client";

import { useQuery } from "@tanstack/react-query";

import { useWorkoutSessionService } from "@/shared/lib/workout-session/use-workout-session.service";
import { useSession } from "@/features/auth/lib/auth-client";

export function useWorkoutSessions() {
  const { data: session } = useSession();

  const { getAll } = useWorkoutSessionService();

  return useQuery({
    queryKey: ["workout-sessions", session?.user?.id],
    queryFn: async () => {
      return getAll();
    },
  });
}
