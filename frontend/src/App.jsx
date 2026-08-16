import { BrowserRouter, Routes, Route } from "react-router-dom";
import NeighborhoodList from "./pages/NeighborhoodList";
import PropertyDetail from "./pages/PropertyDetail";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NeighborhoodList />} />
        <Route path="/neighborhoods/:id" element={<PropertyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}