import { Routes, Route } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Chart from "./components/chart";
function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chart" element={<Chart />} />
    </Routes>
  );
}

export default App;
