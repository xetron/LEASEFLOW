import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden border-r md:block w-72">
        <Sidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}