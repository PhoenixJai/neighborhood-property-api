import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import Badge from "../components/Badge";
import { NameStateFilter } from "../components/FilterBar";
import NeighborhoodModal from "../components/NeighborhoodModal";

export default function NeighborhoodList() {
  const navigate = useNavigate();
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [nameFilter, setNameFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingNeighborhood, setEditingNeighborhood] = useState(null);

  async function loadNeighborhoods() {
    setLoading(true);
    setLoadError("");
    try {
      const data = await api.getNeighborhoods();
      setNeighborhoods(data);
    } catch (err) {
      setLoadError(err.message || "Couldn't load neighborhoods.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNeighborhoods();
  }, []);

  const filtered = useMemo(() => {
    return neighborhoods.filter((n) => {
      const matchesName = n.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesState = !stateFilter || n.state === stateFilter;
      return matchesName && matchesState;
    });
  }, [neighborhoods, nameFilter, stateFilter]);

  function openCreateModal() {
    setEditingNeighborhood(null);
    setModalOpen(true);
  }

  function openEditModal(neighborhood) {
    setEditingNeighborhood(neighborhood);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingNeighborhood(null);
  }

  function handleSaved() {
    closeModal();
    loadNeighborhoods();
  }

  async function handleDelete(neighborhood, e) {
    e.stopPropagation();
    if (!window.confirm(`Delete ${neighborhood.name}? This cannot be undone.`)) return;
    try {
      await api.deleteNeighborhood(neighborhood.neighborhoodId);
      loadNeighborhoods();
    } catch (err) {
      alert(err.message || "Couldn't delete neighborhood.");
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Neighborhoods</h1>
        <button className="primary" onClick={openCreateModal}>
          + New neighborhood
        </button>
      </div>

      <NameStateFilter
        nameFilter={nameFilter}
        onNameChange={setNameFilter}
        stateFilter={stateFilter}
        onStateChange={setStateFilter}
      />

      {loading && <p>Loading…</p>}
      {loadError && <p className="form-error">{loadError}</p>}

      {!loading && !loadError && filtered.length === 0 && (
        <p className="empty-state">No neighborhoods match your filters.</p>
      )}

      {!loading && !loadError && filtered.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>State</th>
              <th>HOA</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((n) => (
              <tr
                key={n.neighborhoodId}
                onClick={() => navigate(`/neighborhoods/${n.neighborhoodId}`)}
                className="clickable-row"
              >
                <td>{n.name}</td>
                <td>{n.state}</td>
                <td><Badge hasHOA={n.hasHOA} /></td>
                <td className="row-actions">
                  <button onClick={(e) => { e.stopPropagation(); openEditModal(n); }}>
                    Edit
                  </button>
                  <button onClick={(e) => handleDelete(n, e)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <NeighborhoodModal
          neighborhood={editingNeighborhood}
          onClose={closeModal}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}