"use client";

import { useEffect, useState } from "react";

type Media = {
  id: string;
  name: string;
  url: string;
  type: string;
  altText: string | null;
  category: string | null;
  createdAt: string;
};

const emptyMedia = {
  name: "",
  url: "",
  type: "image",
  altText: "",
  category: "general",
};

export default function AdminMedia() {
  const [media, setMedia] = useState<Media[]>([]);
  const [form, setForm] = useState(emptyMedia);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadMedia() {
    try {
      const response = await fetch("/api/admin/media");

      if (!response.ok) {
        throw new Error("Failed to load media.");
      }

      const data = await response.json();

      setMedia(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMedia();
  }, []);

  function updateField(
    field: keyof typeof emptyMedia,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function addMedia(event: React.FormEvent) {
    event.preventDefault();

    setSaving(true);

    try {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to add media.");
      }

      setForm(emptyMedia);

      await loadMedia();
    } catch (error) {
      console.error(error);

      alert("Could not add media.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteMedia(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this media record?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/media/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete media.");
      }

      await loadMedia();
    } catch (error) {
      console.error(error);

      alert("Could not delete media.");
    }
  }

  return (
    <div className="admin-services">
      <div className="admin-page-header">
        <div>
          <span className="section-label">
            MEDIA MANAGEMENT
          </span>

          <h1>Media</h1>

          <p>
            Manage images and media used throughout the
            AmakTech website.
          </p>
        </div>
      </div>

      <form
        className="admin-service-form"
        onSubmit={addMedia}
      >
        <h2>Add Media</h2>

        <div className="admin-form-grid">
          <input
            type="text"
            placeholder="Media name"
            value={form.name}
            onChange={(e) =>
              updateField("name", e.target.value)
            }
            required
          />

          <input
            type="url"
            placeholder="Image URL / path"
            value={form.url}
            onChange={(e) =>
              updateField("url", e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Alt text"
            value={form.altText}
            onChange={(e) =>
              updateField("altText", e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              updateField("category", e.target.value)
            }
          />
        </div>

        <div className="admin-form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? "Adding..." : "Add Media"}
          </button>
        </div>
      </form>

      <div className="admin-services-list">
        <h2>Media Library</h2>

        {loading ? (
          <p>Loading media...</p>
        ) : media.length === 0 ? (
          <p>No media has been added yet.</p>
        ) : (
          <div className="media-admin-grid">
            {media.map((item) => (
              <div
                className="media-admin-card"
                key={item.id}
              >
                <div className="media-admin-image">
                  <img
                    src={item.url}
                    alt={
                      item.altText ||
                      item.name
                    }
                  />
                </div>

                <div className="media-admin-content">
                  <h3>{item.name}</h3>

                  <p>
                    {item.category ||
                      "General"}
                  </p>

                  <small>
                    {item.url}
                  </small>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      deleteMedia(item.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}