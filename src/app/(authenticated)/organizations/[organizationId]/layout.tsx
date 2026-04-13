import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { AdminIndicator } from "@/components/admin-indicator";

export default async function AdminLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ organizationId: string }>;
}>) {
  const { organizationId } = await params;
  await getAdminOrRedirect(organizationId);
  return (
    <div className="flex-1 flex flex-col h-full">
      <AdminIndicator />
      {children}
    </div>
  );
}
