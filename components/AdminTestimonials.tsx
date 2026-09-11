"use client";

import { useEffect, useState } from "react";

type Testimonial = {
  id: string;
  clientName: string;
  company: string | null;
  role: string | null;
  content: string;
  image: string | null;
  rating: number;
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

const emptyTestimonial = {
  clientName: "",
  company: "",
  role: "",
  content: "",
  image: "",
  rating: 5,
  featured: false,
  active: true,
  sortOrder: 0,
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<
    Testimonial[]
  >([]);

  const [form, setForm] = useState(emptyTestimonial);
  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadTestimonials() {
    try {
      const response = await fetch(
        "/api/admin/testimonials"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load testimonials."
        );
      }

      const data = await response.json();

      setTestimonials(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  function updateField(
    field: keyof typeof emptyTestimonial,
    value: string | number | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(emptyTestimonial);
    setEditingId(null);
  }

  function editTestimonial(testimonial: Testimonial) {
    setEditingId(testimonial.id);

    setForm({
      clientName: testimonial.clientName,
      company: testimonial.company || "",
      role: testimonial.role || "",
      content: testimonial.content,
      image: testimonial.image || "",
      rating: testimonial.rating,
      featured: testimonial.featured,
      active: testimonial.active,
      sortOrder: testimonial.sortOrder,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function saveTestimonial(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setSaving(true);

    try {
      const url = editingId
        ? `/api/admin/testimonials/${editingId}`
        : "/api/admin/testimonials";

      const method = editingId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to save testimonial."
        );
      }

      resetForm();

      await loadTestimonials();
    } catch (error) {
      console.error(error);

      alert("Could not save testimonial.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteTestimonial(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/testimonials/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete testimonial."
        );
      }

      await loadTestimonials();
    } catch (error) {
      console.error(error);

      alert("Could not delete testimonial.");
    }
  }

  return (
    <div className="admin-services">
      <div className="admin-page-header">
        <div>
          <span className="section-label">
            TESTIMONIAL MANAGEMENT
          </span>

          <h1>Testimonials</h1>

          <p>
            Manage client testimonials displayed on the
            AmakTech website.
          </p>
        </div>
      </div>

      <form
        className="admin-service-form"
        onSubmit={saveTestimonial}
      >
        <h2>
          {editingId
            ? "Edit Testimonial"
            : "Add Testimonial"}
        </h2>

        <div className="admin-form-grid">
          <input
            type="text"
            placeholder="Client name"
            value={form.clientName}
            onChange={(e) =>
              updateField(
                "clientName",
                e.target.value
              )
            }
            required
          />

          <input
            type="text"
            placeholder="Company / Organisation"
            value={form.company}
            onChange={(e) =>
              updateField(
                "company",
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Role / Position"
            value={form.role}
            onChange={(e) =>
              updateField(
                "role",
                e.target.value
              )
            }
          />

          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rating"
            value={form.rating}
            onChange={(e) =>
              updateField(
                "rating",
                Number(e.target.value)
              )
            }
          />

          <input
            type="text"
            placeholder="Image path e.g. /images/testimonials/client.jpg"
            value={form.image}
            onChange={(e) =>
              updateField(
                "image",
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Sort order"
            value={form.sortOrder}
            onChange={(e) =>
              updateField(
                "sortOrder",
                Number(e.target.value)
              )
            }
          />
        </div>

        <textarea
          placeholder="Client testimonial"
          value={form.content}
          onChange={(e) =>
            updateField(
              "content",
              e.target.value
            )
          }
          rows={7}
          required
        />

        <div className="admin-checkboxes">
          <label>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                updateField(
                  "featured",
                  e.target.checked
                )
              }
            />

            Featured testimonial
          </label>

          <label>
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                updateField(
                  "active",
                  e.target.checked
                )
              }
            />

            Active
          </label>
        </div>

        <div className="admin-form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : editingId
              ? "Update Testimonial"
              : "Add Testimonial"}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-services-list">
        <h2>Existing Testimonials</h2>

        {loading ? (
          <p>Loading testimonials...</p>
        ) : testimonials.length === 0 ? (
          <p>
            No testimonials have been added yet.
          </p>
        ) : (
          testimonials.map((testimonial) => (
            <div
              className="admin-service-row"
              key={testimonial.id}
            >
              {testimonial.image && (
                <img
                  src={testimonial.image}
                  alt={testimonial.clientName}
                  className="admin-service-thumb"
                />
              )}

              <div className="admin-service-info">
                <h3>
                  {testimonial.clientName}
                </h3>

                <p>
                  "{testimonial.content}"
                </p>

                <small>
                  {testimonial.company || ""}
                  {testimonial.role
                    ? ` • ${testimonial.role}`
                    : ""}
                  {" • "}
                  {testimonial.rating}/5
                  {" • "}
                  {testimonial.active
                    ? "Active"
                    : "Inactive"}
                  {" • "}
                  {testimonial.featured
                    ? "Featured"
                    : "Standard"}
                </small>
              </div>

              <div className="admin-service-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    editTestimonial(
                      testimonial
                    )
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() =>
                    deleteTestimonial(
                      testimonial.id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}