"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string | null;
  category: string | null;
  technologies: string | null;
  liveUrl: string | null;
  featured: boolean;
  active: boolean;
  sortOrder: number;
};

const emptyProject = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  image: "",
  category: "",
  technologies: "",
  liveUrl: "",
  featured: false,
  active: true,
  sortOrder: 1,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadProjects() {
    try {
      const response = await fetch("/api/admin/projects");

      if (!response.ok) {
        throw new Error("Failed to load projects");
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function updateField(
    field: keyof typeof emptyProject,
    value: string | boolean | number
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function editProject(project: Project) {
    setEditingId(project.id);

    setForm({
      name: project.name,
      slug: project.slug,
      shortDescription: project.shortDescription,
      description: project.description,
      image: project.image || "",
      category: project.category || "",
      technologies: project.technologies || "",
      liveUrl: project.liveUrl || "",
      featured: project.featured,
      active: project.active,
      sortOrder: project.sortOrder,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyProject);
  }

  async function saveProject(event: React.FormEvent) {
    event.preventDefault();

    setSaving(true);

    try {
      const url = editingId
        ? `/api/admin/projects/${editingId}`
        : "/api/admin/projects";

      const method = editingId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        let detail = "Failed to save project.";
        try {
          const payload = await response.json();
          detail =
            typeof payload?.error === "string"
              ? payload.error
              : detail;
        } catch {
          detail = response.statusText || detail;
        }
        throw new Error(detail);
      }

      resetForm();
      await loadProjects();
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Could not save project."
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/projects/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      await loadProjects();
    } catch (error) {
      console.error(error);
      alert("Could not delete project.");
    }
  }

  return (
    <div className="admin-services">
      <div className="admin-page-header">
        <div>
          <span className="section-label">
            PROJECT MANAGEMENT
          </span>

          <h1>Projects</h1>

          <p>
            Add, edit and manage projects displayed on the
            AmakTech website.
          </p>
        </div>
      </div>

      <form
        className="admin-service-form"
        onSubmit={saveProject}
      >
        <h2>
          {editingId ? "Edit Project" : "Add Project"}
        </h2>

        <div className="admin-form-grid">
          <input
            type="text"
            placeholder="Project name"
            value={form.name}
            onChange={(e) =>
              updateField("name", e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Slug e.g. amaktech-connect"
            value={form.slug}
            onChange={(e) =>
              updateField("slug", e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              updateField("category", e.target.value)
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

          <input
            type="text"
            placeholder="Image path"
            value={form.image}
            onChange={(e) =>
              updateField("image", e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Technologies e.g. Next.js, PostgreSQL, Prisma"
            value={form.technologies}
            onChange={(e) =>
              updateField(
                "technologies",
                e.target.value
              )
            }
          />

          <input
            type="url"
            placeholder="Deployment / Live Project URL"
            value={form.liveUrl}
            onChange={(e) =>
              updateField("liveUrl", e.target.value)
            }
          />
        </div>

        <input
          type="text"
          placeholder="Short description"
          value={form.shortDescription}
          onChange={(e) =>
            updateField(
              "shortDescription",
              e.target.value
            )
          }
          required
        />

        <textarea
          placeholder="Full project description"
          value={form.description}
          onChange={(e) =>
            updateField("description", e.target.value)
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
            Featured project
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
              ? "Update Project"
              : "Add Project"}
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
        <h2>Existing Projects</h2>

        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No projects have been added yet.</p>
        ) : (
          projects.map((project) => (
            <div
              className="admin-service-row"
              key={project.id}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.name}
                  className="admin-service-thumb"
                />
              )}

              <div className="admin-service-info">
                <h3>{project.name}</h3>

                <p>
                  {project.shortDescription}
                </p>

                <small>
                  {project.category || "Project"}
                  {" • "}
                  {project.active
                    ? "Active"
                    : "Inactive"}
                  {" • "}
                  {project.featured
                    ? "Featured"
                    : "Standard"}
                </small>
              </div>

              <div className="admin-service-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    editProject(project)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() =>
                    deleteProject(project.id)
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