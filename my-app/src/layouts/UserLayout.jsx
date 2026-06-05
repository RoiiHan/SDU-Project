import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </>
  );
}

export default UserLayout;