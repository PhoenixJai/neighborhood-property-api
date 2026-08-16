import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../api";
import Badge from "../components/Badge";
import { ValueSortToggle } from "../components/FilterBar";
import PropertyModal from "../components/PropertyModal";

export default function PropertyDetail() {
  const { id } = useParams();
  const neighborhoodId = Number(id);
  const navigate = useNavigate();

  const [neighborhood, setNeighborhood] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [sortDirection, setSortDirection] = useState("desc");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  async function loadData() {
    setLoading(true);
    setLoadError("");
    try {
      const [neighborhoodData, propertyData] = await Promise.all([
        api.getNeighborhood(neighborhoodId),
        api.getPropertiesByNeighborhood(neighborhoodId),
      ]);
      setNeighborhood(neighborhoodData);
      setProperties(propertyData);
    } catch (err) {
      setLoadError(err.message || "Couldn't load this neighborhood.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [neighborhoodId]);

  const sortedProperties = useMemo(() => {
    const copy = [...properties];
    copy.sort((a, b) => (sortDirection === "desc" ? b.value - a.value : a.value - b.value));
    return copy;
  }, [properties, sortDirection]);

  function toggleSort() {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  }

  function openCreateModal() {
    setEditingProperty(null);
    setModalOpen(true);
  }

  function openEditModal(property) {
    setEditingProperty(property);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingProperty(null);
  }

  function handleSaved() {
    closeModal();
    loadData();
  }

  async function handleDelete(property) {
    if (!window.confirm(`Delete ${property.address}? This cannot be undone.`)) return;
    try {
      await api.deleteProperty(property.propertyId);
      loadData();
    } catch (err) {
      alert(err.message || "Couldn't delete property.");
    }
  }

  if (loading) return <div className="page"><p>Loading…</p></div>;
  if (loadError) return <div className="page"><p className="form-error">{loadError}</p></div>;
  if (!neighborhood) return null;

  return (
    <div className="page">
      <Link to="/" className="back-link">← All neighborhoods</Link>

      <div className="page-header">
        <div>
          <h1>{neighborhood.name}</h1>
          <p className="neighborhood-meta">
            {neighborhood.state} · <Badge hasHOA={neighborhood.hasHOA} />
          </p>
        </div>
        <button className="primary" onClick={openCreateModal}>
          + New property
        </button>
      </div>

      <div className="filter-bar">
        <ValueSortToggle sortDirection={sortDirection} onToggle={toggleSort} />
      </div>

      {sortedProperties.length === 0 && (
        <p className="empty-state">No properties in this neighborhood yet.</p>
      )}

      {sortedProperties.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedProperties.map((p) => (
              <tr key={p.propertyId}>
                <td>{p.address}</td>
                <td>{p.city}</td>
                <td>{p.state}</td>
                <td>{p.zipcode}</td>
                <td>{p.value.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</td>
                <td className="row-actions">
                  <button onClick={() => openEditModal(p)}>Edit</button>
                  <button onClick={() => handleDelete(p)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <PropertyModal
          property={editingProperty}
          lockedNeighborhoodId={neighborhoodId}
          onClose={closeModal}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}