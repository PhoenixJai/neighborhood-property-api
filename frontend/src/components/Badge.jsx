export default function Badge({ hasHOA }) {
  return (
    <span className={`badge ${hasHOA ? "badge-yes" : "badge-no"}`}>
      {hasHOA ? "HOA" : "No HOA"}
    </span>
  );
}