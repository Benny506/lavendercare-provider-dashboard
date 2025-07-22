import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const HospitalLayout = () => (
  <div className="bg-img min-h-screen bg-primary-100 flex flex-col items-center">
    <Navbar />
    <div className="w-full flex-1 flex flex-col">
      <Outlet />
    </div>
  </div>
);

export default HospitalLayout;