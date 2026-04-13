import { LucideShieldCheck } from "lucide-react";

const AdminIndicator = () => {
  return (
    <div className="sticky top-[76px] z-10 w-full mb-4 animate-header-from-top pointer-events-none">
      <div className="max-w-5xl mx-auto px-6 flex justify-end">
        <div className="pointer-events-auto relative flex items-center gap-2 py-1.5 px-4 overflow-hidden rounded-full border border-primary/20 bg-linear-to-r from-transparent via-primary/10 to-transparent backdrop-blur-md shadow-sm">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-[0.15em]">
            <LucideShieldCheck className="h-4.5 w-4.5" />
            <span>Admin Mode</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AdminIndicator };
