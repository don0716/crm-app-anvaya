import { useLocation } from "react-router";

const Header = () => {

      const location = useLocation();

    const routeHeadings = {
        "/": "Anvaya CRM Dashboard",
        "/leads": "Leads",
        "/leads/new": "Lead Form",
        "/sales-agents": "Sales Agents",
        "/status-view": "Status View",
        "/agents-view": "Agent Performance",
        "/reports": "Reports & Visualization"
    };

     const headingText = routeHeadings[location.pathname] || "CRM";

    return (
        <div>
            <div className="bg-dark text-white d-flex flex-column py-4 text-center">
                <h1>{headingText}</h1>
            </div>
        </div>
    )
}
export default Header