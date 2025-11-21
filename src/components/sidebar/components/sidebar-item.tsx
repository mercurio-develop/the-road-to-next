import { NavItem } from "@/components/sidebar/types";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cloneElement } from "react";
import Link from "next/link";
import { closedClassName } from "@/components/sidebar/constants";
import { Separator } from "@/components/ui/separator";

export type SideBarItemProps = {
  isOpen: boolean;
  navItem: NavItem;
};

const SideBarItem = ({ isOpen, navItem }: SideBarItemProps) => {
  const path = usePathname();
  const isActive = path == navItem.href;
  return (
    <>
      {navItem.separator && <Separator />}
      <Link
        href={navItem.href}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "group relative flex h-12  justify-start",
          isActive && "bg-muted font-bold hover:bg-muted",
        )}
      >
        <div className="flex h-full w-12 items-center justify-center">
          {cloneElement(navItem.icon, {
            className: "h-5 w-5",
          })}
        </div>
        <span
          className={cn(
            "absolute left-12 text-base duration-200",
            isOpen ? "md:block hidden ml-2" : "w-[78px]",
            !isOpen && closedClassName,
          )}
        >
          {navItem.title}
        </span>
      </Link>
    </>
  );
};

export { SideBarItem };
