import { memo } from "react";

type FieldErrorProps = {
  error?: string;
};

const FieldError = memo(({ error }: FieldErrorProps) => {
  if (!error) return null;
  return <span className="text-xs text-red-500">{error}</span>;
});

FieldError.displayName = "FieldError";

export { FieldError };
