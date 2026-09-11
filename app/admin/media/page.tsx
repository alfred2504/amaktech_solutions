import { requireAdmin } from "@/lib/auth";
import AdminMedia from "@/components/AdminMedia";

export default async function AdminMediaPage() {
  await requireAdmin();

  return (
    <main className="admin-page">
      <div className="container">
        <AdminMedia />
      </div>
    </main>
  );
}