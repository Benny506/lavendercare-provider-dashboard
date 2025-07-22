import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const IndividualLayout = () => (
  <div className="bg-img2 min-h-screen bg-primary-100 flex flex-col items-center">
    <Navbar />
    <div className="w-full flex-1 flex flex-col">
      <Outlet />
    </div>
  </div>
);

export default IndividualLayout;