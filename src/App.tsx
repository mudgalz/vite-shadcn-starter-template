import { Route, Routes, useLocation } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import About from "./pages/about";
import Home from "./pages/home";

export default function App() {
  const location = useLocation();

  return (
    <RootLayout>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </RootLayout>
  );
}
