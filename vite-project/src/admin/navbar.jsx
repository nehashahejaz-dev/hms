import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{
        width: "230px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000, // Z-index add kiya hai taake sidebar top par rahe
      }}
    >
      {/* Logo */}
      <div className="text-center mb-4">
        <h4 className="mb-1">🏨 Hotel</h4>
        <small className="text-secondary">Management System</small>
      </div>

      <hr />

      {/* Menu */}
      <ul className="nav nav-pills flex-column mb-auto">

        <li className="nav-item mb-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `nav-link text-white ${isActive ? "active" : ""}`
            }
          >
            🏠 Dashboard
          </NavLink>
        </li>

        <li className="mb-2">
          <NavLink
            to="/admin/rooms"
            className="nav-link text-white"
          >
            🛏️ Rooms
          </NavLink>
        </li>

        <li className="mb-2">
          <NavLink
            to="/admin/bookings"
            className="nav-link text-white"
          >
            📅 Bookings
          </NavLink>
        </li>

        <li className="mb-2">
          <NavLink
            to="/admin/users"
            className="nav-link text-white"
          >
            👤 Users
          </NavLink>
        </li>

        <li className="mb-2">
          <NavLink
            to="/admin/staff"
            className="nav-link text-white"
          >
            👨‍💼 Staff
          </NavLink>
        </li>

        <li className="mb-2">
          <NavLink
            to="/admin/payments"
            className="nav-link text-white"
          >
            💳 Payments
          </NavLink>
        </li>

        <li className="mb-2">
          <NavLink
            to="/admin/reports"
            className="nav-link text-white"
          >
            📊 Reports
          </NavLink>
        </li>

        <li className="mb-2">
          <NavLink
            to="/admin/settings"
            className="nav-link text-white"
          >
            ⚙️ Settings
          </NavLink>
        </li>

      </ul>

      <hr />

      {/* Logout */}
      <button className="btn btn-outline-light btn-sm">
        🚪 Logout
      </button>
    </div>
  
  );
}
