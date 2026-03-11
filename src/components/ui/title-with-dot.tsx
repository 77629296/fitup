import { cn } from "@/shared/lib/utils";

export function TitleWithDot({ title, className }: { title: string; className?: string }) {
  return (
    <div className={cn("mb-5 flex items-center gap-2", className)}>
      <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" />
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
    </div>
  );
}
