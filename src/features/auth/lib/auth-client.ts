import { createAuthClient } from "better-auth/react";
import { adminClient, customSessionClient, inferAdditionalFields } from "better-auth/client/plugins";

import { getServerUrl } from "@/shared/lib/server-url";
import { auth } from "@/features/auth/lib/better-auth";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: getServerUrl(),
  plugins: [adminClient(), customSessionClient<typeof auth>(), inferAdditionalFields<typeof auth>()],
});

export const useIsAdmin = () => {
  const { data: sessionData, isPending: isSessionLoading } = useSession();
  return !isSessionLoading && sessionData?.user?.role?.includes("admin");
};

export const { useSession } = authClient;
