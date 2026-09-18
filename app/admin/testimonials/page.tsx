import { getAdminSession } from "@/lib/auth";
import AdminTestimonials from "@/components/AdminTestimonials";
import { redirect } from "next/navigation";

export default async function AdminTestimonialsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <main className="admin-page">
      <div className="container">
        <AdminTestimonials />
      </div>
    </main>
  );
}