import { useState, useEffect } from "react";
import { api } from "../api";
import { US_STATES } from "./FilterBar";

function emptyForm(lockedNeighborhoodId) {
  return {
    address: "",
    city: "",
    state: "",
    zipcode: "",
    value: "",
    neighborhoodId: lockedNeighborhoodId ?? "",
  };
}

// property: PropertyResponseDTO when editing, null when creating
// lockedNeighborhoodId: set when opened from the Property detail page — pre-fills and disables the neighborhood field
// neighborhoods: full list, only needed if neighborhood field isn't locked
export default function PropertyModal({ property, lockedNeighborhoodId, neighborhoods = [], onClose, onSaved }) {
  const isEdit = Boolean(property);
  const [form, setForm] = useState(emptyForm(lockedNeighborhoodId));
  const [error, setError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (property) {
      setForm({
        address: property.address ?? "",
        city: property.city ?? "",
        state: property.state ?? "",
        zipcode: property.zipcode ?? "",
        value: property.value != null ? String(property.value) : "",
        neighborhoodId: property.neighborhoodId ?? lockedNeighborhoodId ?? "",
      });
    } else {
      setForm(emptyForm(lockedNeighborhoodId));
    }
    setError("");
    setAddressError("");
  }, [property, lockedNeighborhoodId]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "address") setAddressError("");
  }

  function validate() {
    if (!form.address.trim()) return "Enter an address.";
    if (!form.city.trim()) return "Enter a city.";
    if (!form.state || form.state.length !== 2) return "Select a state.";
    if (!form.zipcode.trim() || form.zipcode.length !== 5) return "Enter a 5-digit zip code.";
    if (form.value === "" || Number.isNaN(Number(form.value))) return "Enter a value.";
    if (!form.neighborhoodId) return "Select a neighborhood.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setAddressError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state,
      zipcode: form.zipcode.trim(),
      value: Number(form.value),
      neighborhood: { neighborhoodId: Number(form.neighborhoodId) },
    };

    setSaving(true);
    try {
      if (isEdit) {
        await api.updateProperty(property.propertyId, payload);
      } else {
        await api.createProperty(payload);
      }
      onSaved();
    } catch (err) {
      if (err.status === 409) {
        setAddressError(err.message || "A property at this address already exists.");
      } else {
        setError(err.message || "Something went wrong. Try again.");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? "Edit property" : "New property"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Address
            <input
              type="text"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="123 Main St"
            />
          </label>
          {addressError && <p className="form-error">{addressError}</p>}

          <label>
            City
            <input
              type="text"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              placeholder="Philadelphia"
            />
          </label>

          <div className="field-row">
            <label>
              State
              <select
                value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
              >
                <option value="">Select</option>
                {US_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>

            <label>
              Zip code
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={form.zipcode}
                onChange={(e) => updateField("zipcode", e.target.value.replace(/\D/g, ""))}
                placeholder="19104"
              />
            </label>
          </div>

          <label>
            Value (USD)
            <input
              type="number"
              min="0"
              value={form.value}
              onChange={(e) => updateField("value", e.target.value)}
              placeholder="350000"
            />
          </label>

          {lockedNeighborhoodId ? (
            <input type="hidden" value={form.neighborhoodId} readOnly />
          ) : (
            <label>
              Neighborhood
              <select
                value={form.neighborhoodId}
                onChange={(e) => updateField("neighborhoodId", e.target.value)}
              >
                <option value="">Select neighborhood</option>
                {neighborhoods.map((n) => (
                  <option key={n.neighborhoodId} value={n.neighborhoodId}>
                    {n.name} ({n.state})
                  </option>
                ))}
              </select>
            </label>
          )}

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