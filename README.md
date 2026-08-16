# Neighborhood Property API

A master-detail web application modeling neighborhoods and the properties within them.

**Stack:** React 19 (Vite) · Spring Boot 4.1 (Java 21) · Spring Data JPA / Hibernate · PostgreSQL

## Data Model

**Neighborhood** (master) → **Property** (detail), one-to-many.

### Neighborhood

| Field | Type | Notes |
|---|---|---|
| `neighborhood_id` | Integer | Primary key |
| `name` | String(100) | Required |
| `state` | CHAR(2) | Required |
| `hasHOA` | Boolean | Whether the neighborhood has a homeowners association |

### Property

| Field | Type | Notes |
|---|---|---|
| `property_id` | Integer | Primary key |
| `neighborhood_id` | FK → Neighborhood | Required, `@ManyToOne` |
| `address` | String(100) | Required |
| `city` | String(100) | Required |
| `state` | CHAR(2) | Required |
| `zipcode` | CHAR(5) | Required |
| `value` | Integer | Required |

`city`, `state`, and `zipcode` are plain fields on `Property` rather than a separate normalized table — a deliberate v1 scope decision to keep the schema to a single master-detail pair rather than a multi-level chain.

The relationship is a unidirectional `@ManyToOne` from `Property` to `Neighborhood` (no back-reference collection on `Neighborhood`).

**Note:** required fields are enforced only by NOT NULL constraints at the database level. There is no `@Valid`/bean-validation layer on the controllers, so a malformed POST/PUT (missing field, wrong type) surfaces as a raw 500 from a constraint violation, not a clean 400.

## Architecture

Layered/N-tier separation:

```
React (frontend/)
   ↓
REST Controllers
   ↓
Service Layer      → business logic, validation
   ↓
Repository (JpaRepository)
   ↓
PostgreSQL
```

CORS is currently hardcoded to `http://localhost:5173` (Vite's default dev port) on both controllers via `@CrossOrigin`. Requests from any other origin — a different port, a built/deployed frontend — will be rejected until this is changed or externalized.

## API Endpoints

### Neighborhoods (`NeighborhoodController`)

| Method | Route | Returns |
|---|---|---|
| GET | `/neighborhoods` | `List<Neighborhood>` |
| GET | `/neighborhoods/{id}` | `Neighborhood` or 404 |
| POST | `/neighborhoods` | `Neighborhood`, 201 |
| PUT | `/neighborhoods/{id}` | `Neighborhood` or 404 |
| DELETE | `/neighborhoods/{id}` | 204 or 404 |

### Properties (`PropertyController`)

| Method | Route | Returns |
|---|---|---|
| GET | `/properties` | `List<PropertyResponseDTO>` |
| GET | `/properties/{id}` | `PropertyResponseDTO` or 404 |
| GET | `/neighborhoods/{neighborhoodId}/properties` | `List<PropertyResponseDTO>` for that neighborhood |
| POST | `/properties` | `Property`, 201, or 409 on duplicate |
| PUT | `/properties/{id}` | `Property` or 404, or 409 on duplicate |
| DELETE | `/properties/{id}` | 204 or 404 |

The nested route `/neighborhoods/{neighborhoodId}/properties` lives on `PropertyController` (not `NeighborhoodController`) and is backed by `propertyRepository.findByNeighborhood_NeighborhoodId(...)` — this is how you check how many properties are in a given neighborhood, since `Neighborhood` has no `properties` collection field to navigate directly in Java.

Duplicate-property detection (`DuplicatePropertyException` → 409) checks address + city + state (case-insensitive) + zipcode (exact) before create/update. The check is done by loading all properties via `findAll()` and scanning in-memory, not via a database query — fine at seed-data scale, worth revisiting before it needs to handle a large table.

### Export (`ExportController`)

| Method | Route | Returns |
|---|---|---|
| GET | `/export` | `{ "neighborhoods": [...], "properties": [...] }` — full dump of both tables |

### DTOs

`PropertyResponseDTO` is used on GET responses to flatten the `Property → Neighborhood` relationship into a single object — pulling `neighborhoodId` and `neighborhoodName` off the associated `Neighborhood` — so API consumers get neighborhood context on a property without a second request or a serialized nested entity graph. POST/PUT on `/properties` currently accept and return the raw `Property` entity rather than a DTO; `Neighborhood` endpoints are not yet DTO-backed on either side.

## Project Structure

```
src/                Spring Boot application (entities, repositories, services, controllers)
frontend/           React (Vite) client
backupsDocs/        Backups and supporting docs
neighborhood_property_setup.sql   Schema + seed SQL
backup.sql          Data dump/restore
ArchitectureNotes.md, Diagrams.md  Design documentation
```

## Running Locally

Requires a local PostgreSQL instance with a database named `listdetail_dev`, and `src/main/resources/application.properties` pointed at your own username/credentials. `spring.jpa.hibernate.ddl-auto=validate` means Hibernate will **not** create the schema for you — run `neighborhood_property_setup.sql` against the database first, or startup will fail validation.

```bash
# Backend (Spring Boot / Maven, Java 21)
./mvnw spring-boot:run

# Frontend (React / Vite)
cd frontend
npm install
npm run dev
```

The frontend dev server runs on port 5173 by default — matching the CORS origin configured on the backend. If you change the Vite port, update `@CrossOrigin` in both controllers to match.

---
*Built as part of the Zip Code Wilmington Full Stack Developer Bootcamp (Java/Spring track).*
