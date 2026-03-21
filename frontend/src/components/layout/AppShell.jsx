import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function AppShell() {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-shell">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
