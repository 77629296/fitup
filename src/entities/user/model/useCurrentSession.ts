import { useSession } from "@/features/auth/lib/auth-client";

export const useCurrentSession = () => {
  const session = useSession();
  const sessionData = session.data;

  if (!sessionData) {
    return null;
  }

  return sessionData;
};