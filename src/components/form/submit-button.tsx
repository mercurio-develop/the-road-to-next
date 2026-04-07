"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { LucideLoaderCircle } from "lucide-react";
import { cloneElement } from "react";
import { clsx } from "clsx";

type submitButtonProps = {
  label?: string;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>, "svg">;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

const SubmitButton = ({ label, icon, variant, size }: submitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" variant={variant} size={size}>
      {pending ? (
        <LucideLoaderCircle className="h-4 w-4 animate-spin" />
      ) : icon ? (
        <>
          {cloneElement(icon, {
            className: "h-4 w-4",
          })}
        </>
      ) : null}
      {label}
    </Button>
  );
};

export { SubmitButton };
