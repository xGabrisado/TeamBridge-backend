import { Outlet } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";

export default function RootLayout() {
  return (
    <>
      <Dashboard Outlet={<Outlet />} />
    </>
  );
}
