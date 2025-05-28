import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  return (
    <aside
      className="bg-dark text-white d-flex flex-column p-3 px-5"
      style={{ width: "220px", minHeight: "100vh", position: "sticky", top: 0 }}
    >
      <h2 className="mb-4 text-center fw-bold">Anvaya</h2>

      {isDashboard ? (
        <ul className="nav nav-pills flex-column gap-2">
          <li className="nav-item">
            <NavLink
              to="/leads"
              className={({ isActive }) =>
                "nav-link d-flex align-items-center gap-2" + (isActive ? " active bg-primary" : " text-white")
              }
            >
              <i className="bi bi-people-fill"></i>
              Leads
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/sales-agents"
              className={({ isActive }) =>
                "nav-link d-flex align-items-center gap-2" + (isActive ? " active bg-primary" : " text-white")
              }
            >
              <i className="bi bi-person-badge-fill"></i>
              Sales Agents
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                "nav-link d-flex align-items-center gap-2" + (isActive ? " active bg-primary" : " text-white")
              }
            >
              <i className="bi bi-bar-chart-fill"></i>
              Reports
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "nav-link text-white" + (isActive ? " active bg-primary" : "")
              }
            >
              <i className="bi bi-arrow-left-circle"></i> Back To Dashboard
            </NavLink>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
