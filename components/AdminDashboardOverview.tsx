"use client";

import { useEffect, useState } from "react";

type DashboardStats = {
  enquiries: number;
  newEnquiries: number;
  services: number;
  projects: number;
  testimonials: number;
  media: number;
};

const defaultStats: DashboardStats = {
  enquiries: 0,
  newEnquiries: 0,
  services: 0,
  projects: 0,
  testimonials: 0,
  media: 0,
};

export default function AdminDashboardOverview() {
  const [stats, setStats] =
    useState<DashboardStats>(defaultStats);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadStats() {
    try {
      setError("");

      const response = await fetch(
        "/api/admin/dashboard",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load dashboard statistics."
        );
      }

      const data = await response.json();

      setStats(data);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load dashboard statistics."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <section className="dashboard-overview">
      <div className="dashboard-overview-header">
        <div>
          <span className="section-label">
            ADMIN OVERVIEW
          </span>

          <h1>Dashboard</h1>

          <p>
            Monitor your AmakTech Solutions website
            and business activity.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={loadStats}
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}

      <div className="dashboard-stats-grid">
        <a
          href="/admin/enquiries"
          className="dashboard-stat-card"
        >
          <span className="dashboard-stat-label">
            ENQUIRIES
          </span>

          <strong>
            {loading ? "—" : stats.enquiries}
          </strong>

          <span className="dashboard-stat-description">
            Total enquiries
          </span>
        </a>

        <a
          href="/admin/enquiries"
          className="dashboard-stat-card dashboard-stat-highlight"
        >
          <span className="dashboard-stat-label">
            NEW ENQUIRIES
          </span>

          <strong>
            {loading ? "—" : stats.newEnquiries}
          </strong>

          <span className="dashboard-stat-description">
            Awaiting response
          </span>
        </a>

        <a
          href="/admin/services"
          className="dashboard-stat-card"
        >
          <span className="dashboard-stat-label">
            SERVICES
          </span>

          <strong>
            {loading ? "—" : stats.services}
          </strong>

          <span className="dashboard-stat-description">
            Active services
          </span>
        </a>

        <a
          href="/admin/projects"
          className="dashboard-stat-card"
        >
          <span className="dashboard-stat-label">
            PROJECTS
          </span>

          <strong>
            {loading ? "—" : stats.projects}
          </strong>

          <span className="dashboard-stat-description">
            Active projects
          </span>
        </a>

        <a
          href="/admin/testimonials"
          className="dashboard-stat-card"
        >
          <span className="dashboard-stat-label">
            TESTIMONIALS
          </span>

          <strong>
            {loading ? "—" : stats.testimonials}
          </strong>

          <span className="dashboard-stat-description">
            Active testimonials
          </span>
        </a>

        <a
          href="/admin/media"
          className="dashboard-stat-card"
        >
          <span className="dashboard-stat-label">
            MEDIA
          </span>

          <strong>
            {loading ? "—" : stats.media}
          </strong>

          <span className="dashboard-stat-description">
            Media records
          </span>
        </a>
      </div>
    </section>
  );
}