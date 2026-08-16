import { useState, useEffect } from "react";
import { api } from "../api";
import { US_STATES } from "./FilterBar";

const EMPTY_FORM = { name: "", state: "", hasHOA: false };

export default function NeighborhoodModal({ neighborhood, onClose, onSaved }) {
  const isEdit = Boolean(neighborhood);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (neighborhood) {
      setForm({
        name: neighborhood.name ?? "",
        state: neighborhood.state ?? "",
        hasHOA: Boolean(neighborhood.hasHOA),
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError("");
  }, [neighborhood]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Enter a name.");
      return;
    }
    if (!form.state || form.state.length !== 2) {
      setError("Select a state.");
      return;
    }

    setSaving(true);
    try {
      if (isEdit) {
        await api.updateNeighborhood(neighborhood.neighborhoodId, form);
      } else {
        await api.createNeighborhood(form);
      }
      onSaved();
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? "Edit neighborhood" : "New neighborhood"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Willow Creek"
            />
          </label>

          <label>
            State
            <select
              value={form.state}
              onChange={(e) => updateField("state", e.target.value)}
            >
              <option value="">Select state</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.hasHOA}
              onChange={(e) => updateField("hasHOA", e.target.checked)}
            />
            Has HOA
          </label>

          {error && <p className="form-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="primary" disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}