"use client";

import { useMemo, useState } from "react";

type EnquiryStatus =
  | "NEW"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ARCHIVED";

type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
};

type Props = {
  initialEnquiries: Enquiry[];
};

const statuses: EnquiryStatus[] = [
  "NEW",
  "IN_PROGRESS",
  "COMPLETED",
  "ARCHIVED",
];

export default function AdminEnquiries({
  initialEnquiries,
}: Props) {
  const [enquiries, setEnquiries] =
    useState<Enquiry[]>(initialEnquiries);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"ALL" | EnquiryStatus>("ALL");

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  const filteredEnquiries = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return enquiries.filter((enquiry) => {
      const serviceText = enquiry.service?.toLowerCase() ?? "";

      const matchesSearch =
        !searchValue ||
        enquiry.name.toLowerCase().includes(searchValue) ||
        enquiry.email.toLowerCase().includes(searchValue) ||
        serviceText.includes(searchValue) ||
        (enquiry.company || "")
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "ALL" ||
        enquiry.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, search, statusFilter]);

  async function updateStatus(
    id: string,
    status: EnquiryStatus
  ) {
    setUpdatingId(id);

    try {
      const response = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update enquiry");
      }

      const updated = await response.json();

      setEnquiries((current) =>
        current.map((enquiry) =>
          enquiry.id === id
            ? {
                ...enquiry,
                status: updated.status,
              }
            : enquiry
        )
      );
    } catch (error) {
      console.error(error);
      alert("Could not update the enquiry status.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="admin-enquiries">

      {/* FILTERS */}
      <div className="admin-filters">
        <input
          type="search"
          placeholder="Search enquiries..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value as
                | "ALL"
                | EnquiryStatus
            )
          }
        >
          <option value="ALL">
            All statuses
          </option>

          {statuses.map((status) => (
            <option key={status} value={status}>
              {formatStatus(status)}
            </option>
          ))}
        </select>
      </div>

      {/* SUMMARY */}
      <div className="enquiry-summary">
        <div>
          <span>Total</span>
          <strong>{enquiries.length}</strong>
        </div>

        <div>
          <span>New</span>
          <strong>
            {
              enquiries.filter(
                (item) => item.status === "NEW"
              ).length
            }
          </strong>
        </div>

        <div>
          <span>In Progress</span>
          <strong>
            {
              enquiries.filter(
                (item) =>
                  item.status === "IN_PROGRESS"
              ).length
            }
          </strong>
        </div>

        <div>
          <span>Completed</span>
          <strong>
            {
              enquiries.filter(
                (item) =>
                  item.status === "COMPLETED"
              ).length
            }
          </strong>
        </div>
      </div>

      {/* RESULTS */}
      {filteredEnquiries.length === 0 ? (
        <div className="enquiry-admin-empty">
          <div className="enquiry-admin-icon">
            ENQ
          </div>

          <h3>
            No enquiries found
          </h3>

          <p>
            There are no enquiries matching your
            current search or filter.
          </p>
        </div>
      ) : (
        <div className="enquiry-table-wrapper">
          <div className="enquiry-table">

            <div className="enquiry-table-header">
              <span>Customer</span>
              <span>Service</span>
              <span>Budget</span>
              <span>Status</span>
              <span>Date</span>
            </div>

            {filteredEnquiries.map((enquiry) => (
              <article
                className="enquiry-row"
                key={enquiry.id}
              >
                <div className="enquiry-customer">
                  <strong>
                    {enquiry.name}
                  </strong>

                  <span>
                    {enquiry.email}
                  </span>

                  {enquiry.company && (
                    <small>
                      {enquiry.company}
                    </small>
                  )}

                  {enquiry.phone && (
                    <small>
                      {enquiry.phone}
                    </small>
                  )}
                </div>

                <div>
                  <strong>
                    {enquiry.service || "Not specified"}
                  </strong>
                </div>

                <div>
                  {enquiry.budget || "Not specified"}
                </div>

                <div>
                  <select
                    value={enquiry.status}
                    disabled={
                      updatingId === enquiry.id
                    }
                    onChange={(event) =>
                      updateStatus(
                        enquiry.id,
                        event.target
                          .value as EnquiryStatus
                      )
                    }
                    className={`status-select status-${enquiry.status.toLowerCase()}`}
                  >
                    {statuses.map((status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {formatStatus(status)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="enquiry-date">
                  {formatDate(enquiry.createdAt)}
                </div>

                <div className="enquiry-message">
                  <span>Project details</span>
                  <p>{enquiry.message}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function formatStatus(status: EnquiryStatus) {
  return status
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}