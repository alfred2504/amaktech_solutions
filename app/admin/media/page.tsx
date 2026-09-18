import { getAdminSession } from "@/lib/auth";
import AdminMedia from "@/components/AdminMedia";
import { redirect } from "next/navigation";

export default async function AdminMediaPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <main className="admin-page">
      <div className="container">
        <AdminMedia />
      </div>
    </main>
  );
}