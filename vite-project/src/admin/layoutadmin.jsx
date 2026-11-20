import { Outlet } from "react-router-dom";
import Sidebar from "./navbar";

export default function LayoutAdmin() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Left side par Sidebar */}
      <Sidebar />

      {/* Right side par Main Content - marginLeft add kiya hai */}
      <div 
        className="flex-grow-1 p-4" 
        style={{ marginLeft: "230px", width: "calc(100% - 230px)" }}
      >
        <Outlet />
      </div>
    </div>
  );
}