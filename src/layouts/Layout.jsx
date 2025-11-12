import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div className="w-screen min-h-screen bg-white flex flex-col items-center">
    {/* <Navbar /> */}
    <div className="w-full flex-1 flex flex-col min-h-screen">
      <Outlet />
    </div>
  </div>
);

export default Layout;