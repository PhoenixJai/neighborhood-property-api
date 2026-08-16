const BASE = "http://localhost:8080";

async function handle(response) {
  if (response.status === 204) return null;
  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const text = await response.text();
      if (text) message = text;
    } catch {
      // no body to read, keep default message
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  // Neighborhoods
  getNeighborhoods: () => fetch(`${BASE}/neighborhoods`).then(handle),

  getNeighborhood: (id) => fetch(`${BASE}/neighborhoods/${id}`).then(handle),

  createNeighborhood: (data) =>
    fetch(`${BASE}/neighborhoods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handle),

  updateNeighborhood: (id, data) =>
    fetch(`${BASE}/neighborhoods/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handle),

  deleteNeighborhood: (id) =>
    fetch(`${BASE}/neighborhoods/${id}`, { method: "DELETE" }).then(handle),

  // Properties
  getProperties: () => fetch(`${BASE}/properties`).then(handle),

  getProperty: (id) => fetch(`${BASE}/properties/${id}`).then(handle),

  getPropertiesByNeighborhood: (neighborhoodId) =>
    fetch(`${BASE}/neighborhoods/${neighborhoodId}/properties`).then(handle),

  // note: neighborhood must be nested as { neighborhood: { neighborhoodId } }
  // because the backend binds @RequestBody straight to the Property entity
  createProperty: (data) =>
    fetch(`${BASE}/properties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handle),

  updateProperty: (id, data) =>
    fetch(`${BASE}/properties/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(handle),

  deleteProperty: (id) =>
    fetch(`${BASE}/properties/${id}`, { method: "DELETE" }).then(handle),
};