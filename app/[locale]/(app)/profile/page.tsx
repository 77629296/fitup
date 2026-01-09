"use client";
import { useCurrentSession } from "@/entities/user/model/useCurrentSession";
import { LocalAlert } from "@/components/ui/local-alert";

export default function ProfilePage() {
  const session = useCurrentSession();
  return (
    <div className="px-2 sm:px-6">
      {!session && <LocalAlert className="my-4" />}
      {session && (
        <div className="mt-4">
          <div>
            <h2 className="text-2xl font-bold">Hello, {session.user?.name} 👋</h2>
          </div>
        </div>
      )}
    </div>
  )
}