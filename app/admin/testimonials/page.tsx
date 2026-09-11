import { requireAdmin } from "@/lib/auth";
import AdminTestimonials from "@/components/AdminTestimonials";

export default async function AdminTestimonialsPage() {
  await requireAdmin();

  return (
    <main className="admin-page">
      <div className="container">
        <AdminTestimonials />
      </div>
    </main>
  );
}