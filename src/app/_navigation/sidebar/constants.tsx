import {
  accountProfilePath,
  homePath,
  organizationsPath,
  ticketsPath,
} from "@/paths";
import {
  LucideLibrary,
  LucideBook,
  LucideCircleUser,
  LucideUser,
} from "lucide-react";
import { NavItem } from "@/app/_navigation/sidebar/types";

export const navItems: NavItem[] = [
  { title: "All Tickets", icon: <LucideLibrary />, href: homePath() },
  {
    title: "My Tickets",
    icon: <LucideBook />,
    href: ticketsPath(),
  },
  {
    separator:true,
    title: "Account",
    icon: <LucideCircleUser/>,
    href: accountProfilePath()
  },
  {
    title: "Organization",
    icon: <LucideUser/>,
    href: organizationsPath()
  }
];

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
