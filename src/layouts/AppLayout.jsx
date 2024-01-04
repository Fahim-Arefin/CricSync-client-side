import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AppLayout() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between ">
        <Navbar />
        <div className="grow p-12">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AppLayout;
