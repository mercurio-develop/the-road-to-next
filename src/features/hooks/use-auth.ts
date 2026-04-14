import { User } from ".prisma/client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getAuth } from "@/features/auth/queries/get-auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetched, setFetched] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // If we already have a user, don't refetch on every pathname change
    // unless you specifically want to re-validate auth on every page load.
    // For many apps, fetching once or on a interval is enough.
    if (isFetched) return;

    const fetchUser = async () => {
      const { user } = await getAuth();
      setUser(user);
      setFetched(true);
    };
    fetchUser();
  }, [pathname, isFetched]);

  return { user, isFetched };
};