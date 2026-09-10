"use client";

import { useState } from "react";

type Service = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string | null;
  icon: string | null;
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

type Props = {
  initialServices: Service[];
};

const emptyForm = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  image: "",
  featured: false,
  active: true,
  sortOrder: 0,
};

export default function AdminServices({
  initialServices,
}: Props) {
  const [services, setServices] =
    useState<Service[]>(initialServices);

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  function updateField(
    field: keyof typeof emptyForm,
    value: string | boolean | number
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleNameChange(value: string) {
    setForm((current) => ({
      ...current,
      name: value,
      slug: editingId
        ? current.slug
        : generateSlug(value),
    }));
  }

  function startEditing(service: Service) {
    setEditingId(service.id);

    setForm({
      name: service.name,
      slug: service.slug,
      shortDescription:
        service.shortDescription,
      description: service.description,
      image: service.image || "",
      featured: service.featured,
      active: service.active,
      sortOrder: service.sortOrder,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function saveService() {
    if (
      !form.name ||
      !form.slug ||
      !form.shortDescription ||
      !form.description
    ) {
      alert(
        "Please complete all required service fields."
      );

      return;
    }

    setLoading(true);

    try {
      const endpoint = editingId
        ? `/api/admin/services/${editingId}`
        : "/api/admin/services";

      const response = await fetch(endpoint, {
        method: editingId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Could not save service."
        );
      }

      if (editingId) {
        setServices((current) =>
          current.map((service) =>
            service.id === editingId
              ? data
              : service
          )
        );
      } else {
        setServices((current) => [
          ...current,
          data,
        ]);
      }

      resetForm();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Could not save service."
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteService(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/services/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Could not delete service."
        );
      }

      setServices((current) =>
        current.filter(
          (service) => service.id !== id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        "Could not delete the service."
      );
    }
  }

  return (
    <div className="admin-services">

      {/* FORM */}

      <div className="admin-service-form">

        <div className="admin-form-heading">
          <div>
            <span className="section-label">
              {editingId
                ? "EDIT SERVICE"
                : "NEW SERVICE"}
            </span>

            <h3>
              {editingId
                ? "Update service"
                : "Add a service"}
            </h3>
          </div>

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

        <div className="admin-form-grid">

          <label>
            Service name

            <input
              value={form.name}
              onChange={(event) =>
                handleNameChange(
                  event.target.value
                )
              }
              placeholder="Graphic Design & Branding"
            />
          </label>

          <label>
            Slug

            <input
              value={form.slug}
              onChange={(event) =>
                updateField(
                  "slug",
                  event.target.value
                )
              }
              placeholder="graphic-design-branding"
            />
          </label>

          <label className="admin-field-full">
            Short description

            <input
              value={form.shortDescription}
              onChange={(event) =>
                updateField(
                  "shortDescription",
                  event.target.value
                )
              }
              placeholder="Professional visual design solutions..."
            />
          </label>

          <label className="admin-field-full">
            Full description

            <textarea
              value={form.description}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value
                )
              }
              rows={7}
              placeholder="Describe the service in detail..."
            />
          </label>

          <label>
            Image path

            <input
              value={form.image}
              onChange={(event) =>
                updateField(
                  "image",
                  event.target.value
                )
              }
              placeholder="/images/services/graphic-design.jpg"
            />
          </label>

          <label>
            Display order

            <input
              type="number"
              value={form.sortOrder}
              onChange={(event) =>
                updateField(
                  "sortOrder",
                  Number(event.target.value)
                )
              }
            />
          </label>

        </div>

        <div className="admin-checkboxes">

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) =>
                updateField(
                  "featured",
                  event.target.checked
                )
              }
            />

            Featured service
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(event) =>
                updateField(
                  "active",
                  event.target.checked
                )
              }
            />

            Active
          </label>

        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={saveService}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingId
            ? "Update Service"
            : "Add Service"}
        </button>

      </div>


      {/* SERVICE LIST */}

      <div className="admin-service-list">

        <div className="admin-form-heading">
          <div>
            <span className="section-label">
              SERVICES
            </span>

            <h3>
              Current services
            </h3>
          </div>

          <strong>
            {services.length} services
          </strong>
        </div>

        {services.length === 0 ? (
          <div className="enquiry-admin-empty">
            <h3>
              No services yet
            </h3>

            <p>
              Add your first AmakTech service
              above.
            </p>
          </div>
        ) : (
          <div className="admin-service-items">
            {services.map((service) => (
              <article
                className="admin-service-item"
                key={service.id}
              >
                <div>
                  <span className="service-number">
                    {String(
                      service.sortOrder + 1
                    ).padStart(2, "0")}
                  </span>

                  <h3>
                    {service.name}
                  </h3>

                  <p>
                    {service.shortDescription}
                  </p>

                  <div className="admin-service-meta">
                    <span>
                      {service.active
                        ? "Active"
                        : "Inactive"}
                    </span>

                    {service.featured && (
                      <span>
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="admin-service-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      startEditing(service)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={() =>
                      deleteService(
                        service.id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}