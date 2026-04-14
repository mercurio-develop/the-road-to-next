"use client";

import Link from "next/link";
import { LucideSquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ticketPath } from "@/paths";

type TicketDetailButtonProps = {
  ticketId: string;
};

const TicketDetailButton = ({ ticketId }: TicketDetailButtonProps) => {
  return (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketPath(ticketId)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );
};

export { TicketDetailButton };
